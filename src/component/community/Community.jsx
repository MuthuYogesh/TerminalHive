import React, { useState } from 'react'
import plus from '../images/add.png'
import groupPic from '../images/group.jpg'
import style from './Community.module.css'
import { toggleIsCommunityPopup, selectCommunityList, joinCommunityAsync } from '../../slices/communitySlice'
import { useSelector, useDispatch } from 'react-redux'
import CustomButton from '../btn/CustomButton'

export default function Community() {
  const dispatch = useDispatch()
  const communityList = useSelector(selectCommunityList);
  // console.log(isCommunityPopup);

  // Error 1 A non-serializable value was detected in an action, in the path: payload. Value: SyntheticBaseEvent
  // due to the fact that ele is a SyntheticBaseEvent, which is not serializable.
  const handleJoin = (com) => {
    console.log("ele:", com);
    const currentCommunity = communityList.find(community=>com.id === community.id);
    console.log("currentCommunity:", currentCommunity);

    dispatch(joinCommunityAsync({currentCommunity, currentUser: JSON.parse(sessionStorage.getItem("currentUser"))}));
  }

  return (
    <div className={style.community}>
      <div className={style.top}>
        <h2>Community</h2>
        <img className={style.communityAdd} src={plus} alt="+" onClick={()=>{dispatch(toggleIsCommunityPopup())}}></img>
      </div>
      <div className={style.bottom}>
        {communityList.map((community, idx)=>{
          return(
            <div key={idx} className={style.communitySubDiv}>
              <div className={style.communityInfo}>
                <img className={style.communityImg} src={groupPic} alt="community"></img>
                <div className={style.communityDetails}>
                  <h3>{community.name}</h3>
                  <p>Members:{community.members.length}</p>
                </div>
              </div>
              <CustomButton btnText='Join' customStyle={style.joinBtn} handleClick={()=>handleJoin(community)}></CustomButton>
            </div>
          )
        })}
      </div>
    </div>
  )
}
