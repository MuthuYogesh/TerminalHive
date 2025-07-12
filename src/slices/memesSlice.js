import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const fetchMemesAsync = () => async (dispatch)=>{
    try{
        dispatch(fetchMemesStart())
        const response = await axios.get("https://meme-api.com/gimme/ProgrammerHumor/10");
        dispatch(fetchMemesSuccess(response.data.memes));
    }
    catch(err){
        dispatch(fetchMemesFailed(err));
    }
}

const initialState = {
    memes:[],
    loading: false,
    error:null
}

const memesSlice = createSlice({
    name:'memes',
    initialState,
    reducers:{
        fetchMemesStart:(state)=>{
            state.loading = true;
            state.error = null;
        },
        fetchMemesSuccess:(state, action)=>{
            state.memes = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchMemesFailed:(state, action)=>{
            state.error = action.payload;
            state.loading = false;
        }
    }
})

export {fetchMemesAsync};
export const {fetchMemesStart, fetchMemesSuccess, fetchMemesFailed} = memesSlice.actions;
export const memeses = (state)=>state.memes;
export default memesSlice.reducer;