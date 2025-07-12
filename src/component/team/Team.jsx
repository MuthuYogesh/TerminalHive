import React from 'react'
import teamProfile from '../images/teamProfile.jpg'
import style from './Team.module.css'

export default function Team() {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser")) || {};
  const followers = currentUser.followers || [];
  console.log("Current User: ", currentUser);
  console.log("Followers: ", followers);
  return (
    <div className={style.team}>
      <h2>Our Team</h2>
      <div className={style.teamMembers}>
        <div className={style.member}>
          <img src={teamProfile} alt="You" />
          <div className={style.memberInfo}>
            <h3>{currentUser.name}</h3>
            <p>Admin</p>
          </div>
        </div>
        {followers.map((user, idx)=>{
          return (
            <div className={style.member} key={idx}>
              <img src={teamProfile} alt={`Member ${idx}`} />
              <div className={style.memberInfo}>
                <h3>{user}</h3>
                <p>Team mate</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
