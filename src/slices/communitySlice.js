import {createSlice} from '@reduxjs/toolkit';

const joinCommunityAsync = (payload) => (dispatch, getState) => {
    dispatch(joinCommunity(payload));
    const { communities } = getState();
    localStorage.setItem("communityList", JSON.stringify(communities.communityList));
}

const initialState = {
    communityList: JSON.parse(localStorage.getItem("communityList")) || [],
    isCommunityPopup: false,
    newCommunityName: '',
}

const communitySlice = createSlice({
    name:'community',
    initialState: initialState,
    reducers:{
        toggleIsCommunityPopup(state){
            state.isCommunityPopup = !state.isCommunityPopup
        },
        setCommunity(state, action){
            state.newCommunityName = action.payload;
        },
        addCommunity(state){
            const newCommunity = {
                id: state.communityList.length + 1,
                name: state.newCommunityName,
                createdBy: JSON.parse(sessionStorage.getItem("currentUser")).name,
                createdAt: new Date().toISOString(),
                members: [],
            }
            state.communityList = [...state.communityList, newCommunity]
            localStorage.setItem("communityList", JSON.stringify(state.communityList));
            
            // to reset pop window
            state.isCommunityPopup = false;
            state.newCommunityName = '';
        },
        joinCommunity(state, action){
            const community = state.communityList.find(community => community.id === action.payload.currentCommunity.id);
            if (community && !community.members.includes(action.payload.currentUser.name)) {
                community.members.push(action.payload.currentUser.name);
            }
        }
    }
});

export const {toggleIsCommunityPopup, setCommunity, addCommunity, joinCommunity} = communitySlice.actions;
export { joinCommunityAsync };
export const selectCommunityList = (state) => state.communities.communityList;
export const selectIsCommunityPopup = (state) => state.communities.isCommunityPopup;
export default communitySlice.reducer;