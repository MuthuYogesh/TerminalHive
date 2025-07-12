import React, {useEffect} from 'react'
import image from '../../component/images/profile.png'
import Navbar from '../../component/Navbar/Navbar';
import style from './Memes.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMemesAsync, memeses } from '../../slices/memesSlice';

export default function Memes() {
  const {memes, loading, error} = useSelector(memeses);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchMemesAsync());
  },[dispatch])

  useEffect(()=>{
    console.log("memes:", memes, loading, error);
  }, [memes, loading, error]);

  return (
    <>
        <Navbar memes={style.memes}></Navbar>
        <div className={style.container}>
            {(!loading && error === null)?memes.map((meme, idx)=>{
                return(
                    <div className={style.memePallete} key={idx}>
                        <div className={style.profileName}>
                            <img className={style.profilePic} src={image} alt="profile-pic"/>
                            <p>{meme.subreddit}/{meme.author}</p>
                        </div>
                        <img className={style.memesImg} src={meme.url} alt="memes" />
                    </div>
                )
            })
            : <div> Error! Try reload again </div>
            }
        </div>
    </>
  )
}
