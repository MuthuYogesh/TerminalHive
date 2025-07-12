import React, { useEffect, useState } from 'react'
import profile from '../images/profile.png'
import image from '../../component/images/img.png'
import like from '../../component/images/like1.png'
import liked from '../../component/images/like2.png'
import comment from '../../component/images/comments.png'
import share from '../../component/images/share.png'
import save from '../../component/images/save.png'
import style from './Post.module.css'
import { addCommentAsync, toggleLikeAsync } from '../../slices/postSlice'
import { selectUserList, toggleFollowAsync, selectIsFollowing } from "../../slices/userSlice";
import { useSelector, useDispatch } from 'react-redux';
import CustomButton from '../btn/CustomButton'

export default function PostCard({post}) {
  const [commentText, setCommentText] = useState('');
  const [cmnt, setCmnt] = useState(false);
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
  // All users list
  const userList = useSelector(selectUserList);
  console.log("userList - 1 :", userList);
  const dispatch = useDispatch();

  // From postSlice
  const currentPost = post;
  const targetUser = currentPost.userProfile.userName;
  const isFollowing = useSelector(selectIsFollowing);
  const currentLike = post.likedBy.findIndex(likedUser => likedUser === currentUser.name);
  

  const handleFollow = ()=>{
    // console.log(targetUser)
    console.log("userList - 2 :", userList);
    dispatch(toggleFollowAsync({
        currentUser:currentUser, 
        userToFollow:targetUser
    }));
  }
    
  useEffect(() => {
    if (currentUser) {
      let updatedCurrentUser = userList.find(user => user.name === currentUser.name);
      console.log("updatedCurrentUser:", updatedCurrentUser);
      console.log("currentUser:", currentUser);
      console.log("userList - 3 :", userList);
      const currentLike =  post.likedBy.findIndex(likedUser => likedUser === currentUser.name);
      console.log("currentLike:", currentLike);
      if (updatedCurrentUser) {
        sessionStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));
      }
    }
  }, [userList, currentUser]);

  const handleLike = () => {
    // if (post.likes.includes(currentUser.name)) {
  dispatch(toggleLikeAsync({
    postId: post.id,
    user: currentUser
  }));
  };

  const handleCommentSubmit = (e) => {
  e.preventDefault();
  if (!commentText.trim()) return;
  dispatch(addCommentAsync({
    postId: post.id,
    comment: {
      user: currentUser.name,
      text: commentText
    }
  }));
  setCommentText('');
};

const toggleCmntInput = () => {
  setCmnt(!cmnt);
}

  return (
    <>
        <div className={style.postHeader}>
            <img className={style.postUserProfileInside} src={profile} alt="img"/>
            <h4>{targetUser}</h4>
            <div className={style.postFollow} onClick={handleFollow}>{(isFollowing)?<p>Following</p>:<p>Follow</p>}</div>
        </div>
        <img src={currentPost.userPost.postImage} className={style.postImg}/>
        <div className={style.postFooter}>
          {(currentLike===-1)&&<img className={style.postFooterLike} src={like} alt="like" onClick={handleLike}/>}
          {(currentLike!==-1)&&<img className={style.postFooterLike} src={liked} alt="like" onClick={handleLike}/>}
          <img className={style.postFooterCmnt} src={comment} alt="comments" onClick={toggleCmntInput}/>
          <img className={style.postFooterShare} src={share} alt="like"/>
          <img className={style.postFooterSave} src={save} alt="like"/>
        </div>
        <div className={style.description}>
          <img className={style.postUserProfileInside} src={profile} alt="img"/>
          <strong>{currentPost.userProfile.userName}</strong>
          <p>{currentPost.userPost.discription}</p>
        </div>
        {cmnt&&<div className={style.comments}>
            <h4>Comments</h4>
            <form>
                <input
                  type="text"
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className={style.commentInput}
                />
            <CustomButton btnText='Post' customStyle={style.customStylePost} handleClick={handleCommentSubmit}>Post</CustomButton>
            </form>
            <div>
              {(post.comments || []).map((c, idx) => (
                <div key={idx}>
                  <strong>{c.user}:</strong> {c.text}
                </div>
              ))}
            </div>
        </div>}
    </>
  )
}
