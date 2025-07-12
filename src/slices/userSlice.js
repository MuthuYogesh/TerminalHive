import {createSlice} from '@reduxjs/toolkit'

// Thunk for toggling follow and updating localStorage
const toggleFollowAsync = (payload) => (dispatch, getState) => {
    dispatch(toggleFollow(payload));
    const { users } = getState();
    // const currentUser = sessionStorage.getItem("currentUser");
    localStorage.setItem("userDetails", JSON.stringify(users.userList));
}; 

 const sampleUsers = [{
    name: "SampleUser1",
    profileImage: "/images/1.jpg",
    followers: [],
    following: []
  }]

const initialState = {
    // All the users Signed up for the app
    userList: JSON.parse(localStorage.getItem("userDetails")) || sampleUsers,
    isFollowing: false
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers:{
        toggleFollow(state, action){
            const {currentUser, userToFollow} = action.payload; 

            let currentUserObj = state.userList.find(user => user.name === currentUser.name);
            if (!currentUserObj) {
                currentUserObj = {...currentUser, followers: [] };
                state.userList.push(currentUserObj);
            }
            // user who posts the post
            const targetUser = state.userList.find(postedUser => postedUser.name === userToFollow);
            if (!targetUser) return;

            // Ensure followers array exists
            if (!Array.isArray(targetUser.followers)) {
                targetUser.followers = [];
            }
            
            // idx of current user using the app
            const index = targetUser.followers.indexOf(currentUser.name);

            // add followers if not in the followers list of posted user
            if (index === -1) {
                targetUser.followers.push(currentUser.name);
                state.isFollowing = true;
                // console.log("idx: -1: ", targetUser)
            }
            // remove followers from the followers list of posted user
            else {
                // console.log("idx !== -1: ", targetUser)
                targetUser.followers.splice(index, 1);
                state.isFollowing = false;
            }
            // Update the userDetails in localStorage
            // localStorage.setItem("userDetails", JSON.stringify(state.userList));
        }
    }
})

export const { toggleFollow } = userSlice.actions;
export { toggleFollowAsync };
export const selectUserList = (state) => state.users.userList;
export const selectIsFollowing = (state) => state.users.isFollowing;
export default userSlice.reducer;