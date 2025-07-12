import {configureStore} from '@reduxjs/toolkit';
// import thunk from 'redux-thunk'; // Not needed Thunk already included in Redux Toolkit
import communityReducer from './slices/communitySlice';
import postReducer from './slices/postSlice';
import userReducer  from './slices/userSlice';
import newsReducer from './slices/newsSlice';
import memesReducer from './slices/memesSlice';
import projectsReducer from './slices/projectSlice';

const store = configureStore({
    reducer:{
        communities: communityReducer,
        users: userReducer,
        posts: postReducer,
        news: newsReducer,
        memes: memesReducer,
        projects: projectsReducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;