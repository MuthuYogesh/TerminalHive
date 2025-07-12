import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_KEY = process.env.REACT_APP_TECHIESPOT_API_KEY

const fetchNewsAsync = () => async (dispatch)=>{
    try{
        dispatch(fetchNewsstart());
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=technology&apiKey=${API_KEY}`);
        const result = response.data.articles
        dispatch(fetchNewsSuccess(result));
    }
    catch(err){
        dispatch(fetchNewsFailed(err.message));
    }
}

const initialState = {
    articles:[],
    loading:false,
    error:null
}

const newsSlice = createSlice({
    name:'news',
    initialState,
    reducers:{
        fetchNewsstart:(state)=>{
            state.loading = true;
            state.error = null
        },
        fetchNewsSuccess:(state, action)=>{
            state.loading = false;
            state.error = null;
            state.articles = action.payload;
        },
        fetchNewsFailed:(state, action)=>{
            state.loading = false;
            state.error = action.payload;
        }

    }

})

export const { fetchNewsstart, fetchNewsSuccess, fetchNewsFailed } = newsSlice.actions;
export { fetchNewsAsync };
export const news = (state)=>state.news;
export default newsSlice.reducer;