import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { news, fetchNewsAsync } from '../../slices/newsSlice'
import Navbar from '../../component/Navbar/Navbar'
import style from './News.module.css'


export default function News() {
  const {articles, loading, error} = useSelector(news);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchNewsAsync());
  },[dispatch])

  useEffect(() => {
  console.log("articles:", articles);
}, [articles, loading, error]);

  return (
    <>
      <Navbar news={style.news}></Navbar>
      <div className={style.container}>
        {(!loading && error === null)?articles.map((article, idx)=>{
          return(
            <div className={style.newsPallete} key={idx}>
              <h2>{article.title}</h2>
              <p>{article.description} <Link to={article.url}>Click here</Link></p>
              
              <img src={article.urlToImage} alt='Image Here'></img>
            </div>
          )
        })
        :<div> Error! Try reload again </div>
        }
      </div>
    </>
  )
}
