import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import terminal from '../images/terminal.png'
import logout from '../images/logout.png'
import style from './Navbar.module.css'

export default function Navbar({home, news, memes, project}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/')
  }

  const handletakeHome = () => {
    navigate('/home');
  }

  return (
    <div className={style.navbar}>
        <div className={style.left}>
            <img className={style.logo} src={terminal} alt='logo here' onClick={handletakeHome}></img>
            <h2 className={style.logoName}>TechiSpot</h2>
        </div>
        <ul className={style.right}>
            <li className={`${style.item} ${home}`}><Link className={style.link} to='/home'>Home</Link></li>
            <li className={`${style.item} ${news}`}><Link className={style.link} to='/news'>Tech News</Link></li>
            <li className={`${style.item} ${memes}`}><Link className={style.link} to='/memes'>Tech Memes</Link></li>
            <li className={`${style.item} ${project}`}><Link className={style.link} to='/projects'>Projects</Link></li>
            <li className={style.item}><img className={style.logout} src={logout} alt='logout' onClick={handleLogout}></img></li>
        </ul>

    </div>
  )
}
