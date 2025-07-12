import React, { useRef } from 'react'
import Navbar from '../../component/Navbar/Navbar'
import Community from '../../component/community/Community'
import Post from '../../component/posts/Post'
import Team from '../../component/team/Team'
import CustomButton from '../../component/btn/CustomButton'
import Xbtn from '../../component/images/X.png'
import style from './Home.module.css'
import { toggleIsCommunityPopup, selectIsCommunityPopup, setCommunity, addCommunity } from '../../slices/communitySlice'
import { useSelector, useDispatch } from 'react-redux'

export default function Home() {
  const communityRef = useRef();
  const dispatch = useDispatch();
  const isCommunityPopup = useSelector(selectIsCommunityPopup);
  console.log(isCommunityPopup);

  const handleSubmit = (e)=>{
    e.preventDefault();
    let newCommunity = communityRef.current.value;
    dispatch(setCommunity(newCommunity))
    dispatch(addCommunity());
  }

  return (
    <>
    <Navbar home={style.home}></Navbar>
    <div className={style.container}>
        <Community></Community>
        <Post></Post>
        <Team></Team>
    </div>
    {isCommunityPopup&&<div className={style.popupOverlay}>
      <div className={style.communityPopup}>
        <img className={style.close} src={Xbtn} alt='x' onClick={()=>{dispatch(toggleIsCommunityPopup())}}></img>
        <h2>Add Community</h2>
        <input className={style.inputCommunity} type='text' placeholder='Community Name' ref={communityRef}></input>
        <div className={style.btns}>
          <CustomButton customStyle={style.customStyle} btnText='Cancel' handleClick={()=>{dispatch(toggleIsCommunityPopup())}}></CustomButton>
          <CustomButton customStyle={style.customStyle} btnText='Add' handleClick={handleSubmit}></CustomButton>
        </div>
      </div>
    </div>}
     </>
  )
}

