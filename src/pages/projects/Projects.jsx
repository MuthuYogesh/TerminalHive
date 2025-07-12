import React, { useRef } from 'react'
import style from './Projects.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { projectsList, addProjectsAsync } from '../../slices/projectSlice'
import CustomButton from '../../component/btn/CustomButton'
import Navbar from '../../component/Navbar/Navbar'

export default function Projects() {
//   const Pprojects = [
//     {
//         title:"Techispot",
//         stack:["React", "React-Redux", "Redux-Thunk","Local/sessionStorage", "axios"]
//     },
//     {
//         title:"Weather APP",
//         stack:["React", "Leaflet", "REST API", "axios"]
//     },
//     {
//         title:"URL shortner",
//         stack:["ExpressJS", "Mongoose", "MongoDB", "NanoID", "RESTfull API","axios"]
//     }
//   ]

  const projects = useSelector(projectsList);
  const dispatch = useDispatch();
  const titleRef = useRef();
  const stackRef = useRef();
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser")); 

  const handleSubmit = ()=>{
    const title = titleRef.current.value;
    const stack = stackRef.current.value;
    dispatch(addProjectsAsync({name:currentUser.name ,title:title, stack:stack}))
  }

  return (
    <>
      <Navbar project={style.projects}/>
      <div className={style.container}>
          <form>
              <label>Title</label>
              <input ref={titleRef} placeholder='Enter the Title'></input>
              <label>Stack</label>
              <textarea ref={stackRef} placeholder='Enter the Tech Stack'></textarea>
              <CustomButton btnText='Submit' handleClick={handleSubmit}></CustomButton>
          </form>
          <div className={style.projectList}>
            <h1>Projects</h1>
            {projects.map((project, idx)=>{
                return(
                  (project.name === currentUser.name) &&
                    <div className={style.projectPallate} key={idx}>
                        <h2>{project.title}</h2>
                        <p>Stack: {project.stack}</p>
                    </div>
                )
            })}
          </div>
      </div>
    </>
  )
}
