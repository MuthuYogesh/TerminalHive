import { createSlice } from '@reduxjs/toolkit'

const addPostAsync = (payload) => (dispatch, getState) => {
    dispatch(addPost(payload));
    const { posts } = getState();
    localStorage.setItem('postList', JSON.stringify(posts.postList));
};

const addCommentAsync = (payload) => (dispatch, getState) => {
    dispatch(addComment(payload));
    const { posts } = getState();
    localStorage.setItem('postList', JSON.stringify(posts.postList));
};

const toggleLikeAsync = (payload) => (dispatch, getState) => {
    dispatch(toggleLike(payload));
    const { posts } = getState();
    localStorage.setItem('postList', JSON.stringify(posts.postList));
};

const samplePosts = [
  {
    id: 1,
    userProfile: {
      userName: 'SampleUser1',
      userImage: '/images/1.jpg',
      alt: 'profileimage'
    },
    userPost: {
      discription: 'Welcome to Techispot! This is a sample post.',
      postImage: '/images/background.jpg',
      alt: 'userPost'
    },
    comments: [],
    timestamp: '2025-07-11T10:15:00',
    likes: 5,
    tags: ['welcome', 'sample'],
    location: 'India',
    likedBy: []
  }
]

const initialState = {
    postList: JSON.parse(localStorage.getItem("postList")) || samplePosts,
}

const postSlice = createSlice({
    name:'post',
    initialState,
    reducers:{
        addPost(state, action){
            const newPost = {
            id: Date.now(),
            ...action.payload,
            comments: [],
            likes: 0,
            likedBy: []
            };
            state.postList = [...state.postList, newPost];
        },
        addComment(state, action) {
            const { postId, comment } = action.payload;
            const post = state.postList.find(post => post.id === postId);

            if (post) {
                post.comments.push(comment);
            }
        },
        toggleLike(state, action) {
            const { postId, user } = action.payload;
            const post = state.postList.find(post => post.id === postId);

            if (!post) return;

            const index = post.likedBy.findIndex(likedUser => likedUser === user.name);

            if (index === -1) {
                post.likedBy.push(user.name);
                post.likes += 1;
            } else {
                post.likedBy.splice(index, 1);
                post.likes -= 1;
            }
        },
    }
})

export const { addPost, addComment, toggleLike} = postSlice.actions;
export { addPostAsync, addCommentAsync, toggleLikeAsync };
export const selectPostList = (state)=>state.posts.postList;
export default postSlice.reducer;