import React, { useState, useRef } from 'react'
import style from './Post.module.css'
import profile from '../images/profile.png'
import image from '../../component/images/img.png'
import CustomButton from '../../component/btn/CustomButton'
import { useSelector, useDispatch } from "react-redux";
import { addPostAsync, selectPostList } from '../../slices/postSlice';
import PostCard from './PostCard'


export default function Post() {
  const [isPopUp, setisPopUp] = useState(false);
  const postRef = useRef();
  const imgUrlRef = useRef();

  const dispatch = useDispatch();
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const posts = useSelector(selectPostList);
  // console.log(posts)

//   function toBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//   });
// }

  const handleSubmit = (e)=>{
      e.preventDefault();
      // const file = imgUrlRef.current.files[0];
      // let postImageUrl = "";
      // if (file) {
      //   postImageUrl = await toBase64(file); // Convert to base64
      // }
      if (!postRef.current.value.trim() && !imgUrlRef.current.value) return;

      const newPost = {
        userProfile: {
          userName: currentUser.name,
          userImage: currentUser.profileImage || "default-image.jpg",
          alt: "profileImage"
        },
        userPost: {
          discription: postRef.current.value,
          postImage: imgUrlRef.current.value || "",
          alt: "postImage"
        },
        comments: [],
        timestamp: new Date().toISOString(),
        likes: 0,
        tags: [],
        location: "India",
        likedBy: []
      };

      dispatch(addPostAsync(newPost));
      postRef.current.value = '';
      imgUrlRef.current.value = '';
      setisPopUp(!isPopUp);

  }
  
  const handlePopUp = (e)=>{
    e.preventDefault();
    setisPopUp(!isPopUp);
  }

  return (
    <div className={style.post}>
      {
        (isPopUp)&&
        <div className={style.postPopUp}>
            <h3>Create Post</h3>
            <textarea defaultValue="What do you wana share?" ref={postRef}></textarea>
            <div className={style.postPopUpImg}>
              <img src={image} alt='Image: '/>
              <input type='text' className={style.popUpImgUrl} ref={imgUrlRef} placeholder='Do not give any URL-in deployed link'/>
            </div>
            <div className={style.btns}>
              <CustomButton customStyle={style.customStyle} btnText='Post' handleClick={handleSubmit}></CustomButton>
              <CustomButton customStyle={style.customStyle} btnText='Cancel' handleClick={handlePopUp}></CustomButton>
            </div>
        </div>
      }
      <div className={style.postTop}> 
        <img className={style.postUserProfile} src={profile} alt='profile'></img>
        <input type='button' className={style.postInput} defaultValue='Wanna Post Something?' onClick={handlePopUp}/>
      </div>
      <div className={style.postBottom}>
        {posts.map((post, idx)=>{
          return(
            <div key={idx}className={style.postCard}>
              <PostCard post={post}></PostCard>
            </div>
        )
        })}
      </div>
    </div>
  )
}
