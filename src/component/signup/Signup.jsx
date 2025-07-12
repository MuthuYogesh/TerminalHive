import React,{ useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import CustomButton from '../btn/CustomButton'
import style from '../signin/Signin.module.css'

export default function Signup() {
  const [err, setErr] = useState("");
  const nameRef = useRef();
  const emailRef = useRef();
  const pswdRef = useRef();
  const navigate = useNavigate();

  const handleSignUp = (e)=>{
    e.preventDefault();

    if(nameRef.current.value === ''){
        setErr("Name is Empty")
        return;
    } 
    else if(emailRef.current.value === ''){
        setErr("Email is Empty")
        return;
    }
    else if(!/^[a-z0-9.]+@([a-z]+\.)+[a-z]{2,}$/.test(emailRef.current.value)){
      setErr("Invalid Email Format");
      return;
    }
    else if(pswdRef.current.value === ''){
        setErr("Password is Empty")
        return;
    }

    let newUser = {name:nameRef.current.value, email:emailRef.current.value, pswd:pswdRef.current.value, followers:[]};
    let userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
    let updateUserDetais = [...userDetails, newUser];
    localStorage.setItem("userDetails", JSON.stringify(updateUserDetais));
    sessionStorage.clear();
    sessionStorage.setItem("currentUser", JSON.stringify(newUser));
    navigate('/home');
  }

  return (
      <div className={style.container}>
        <form className={style.signin}>
          <h3>Sign Up</h3>
          {err&&<p className={style.err}>*{err}</p>}
          <label>Name</label>
          <input className={style.input} type='text' placeholder='Enter Name' ref={nameRef}/>
          <label>Email</label>
          <input className={style.input} type='email' placeholder='Enter Email' ref={emailRef}/>
          <label>Password</label>
          <input className={style.input} type='password' placeholder='Enter Password' ref={pswdRef}/>
          <CustomButton btnText='SignUp' customStyle={style.customBtn} handleClick={handleSignUp}/>
        </form>
      </div>
  )
}
