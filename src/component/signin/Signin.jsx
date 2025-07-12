import React, { useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import style from './Signin.module.css'
import CustomButton from '../btn/CustomButton';


export default function Signin() {
  const [err, setErr] = useState("");
  const [forgot, setForgot] = useState(false);
  const emailRef = useRef();
  const pswdRef = useRef();
  const cpswdRef = useRef();
  const navigate = useNavigate();

  const handleSignIn = (e)=>{
    e.preventDefault();

    if(emailRef.current.value === ''){
        setErr("Email is Empty")
        return;
    }
    else if(pswdRef.current.value === ''){
        setErr("Password is Empty")
        return;
    }
    // localStorage.setItem("userDetails",JSON.stringify([{name:"muthu", email:"muthu@email.com", pswd:"muthu123",}]));
    let userDetails = JSON.parse(localStorage.getItem("userDetails"));

    if(!userDetails){
      setErr("Invalid Credentials Please try again or SignUp first")
      return
    }

    // console.log(userDetails);
    let currentUser = {}
    for(let i=0; i<userDetails.length; i++){
      if(userDetails[i].email === emailRef.current.value && userDetails[i].pswd === pswdRef.current.value){
          currentUser = userDetails[i];
          break;
      }else{
        // console.log(userDetails[i])
        setErr("Invalid credentials Please try again or SignUp first");
        return;
      }
    }
    sessionStorage.clear();
    console.log(currentUser);
    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
    navigate('/home');
  }

  const handleSignUp = (e)=>{
    e.preventDefault();
    navigate('/signup');
  }

  const handleForgotPswd = (e)=>{
    e.preventDefault();
    setForgot(true);
  }

  const handleResetPswd = (e)=>{
    e.preventDefault();

    if(emailRef.current.value === ''){
        setErr("Email is Empty")
        return;
    } 
    else if(pswdRef.current.value === ''){
        setErr("Password is Empty")
        return;
    }
    else if(cpswdRef.current.value === ''){
        setErr("Confirm Password is Empty")
        return;
    }

    let userDetails = JSON.parse(localStorage.getItem("userDetails"));

    if(!userDetails){
      setErr("No Data Please cancel this and SignUp First")
      return;
    }

    let currentUser = {}
    for(let i=0; i<userDetails.length; i++){
      if(userDetails[i].email === emailRef.current.value){
          currentUser = userDetails[i];
      }else{
        setErr("No Email Found SignUp First")
        return
      }
    }
    
    if(pswdRef.current.value === cpswdRef.current.value){
      let pswd = pswdRef.current.value;
      let updateUser = {...currentUser, pswd:pswd};
      let updatedUserDetails = [...userDetails, updateUser]
      localStorage.setItem("userDetails", JSON.stringify(updatedUserDetails));
      sessionStorage.clear();
      sessionStorage.setItem("currentUser", JSON.stringify(updateUser));
      navigate('/home')
    }

  }

  const handleCancel = (e)=>{
    e.preventDefault();
    navigate('/');
  }

  return (
    <div className={style.container}>
      
      <form className={style.signin}>
        {(!forgot) ?
          <>
            <h3>Login</h3>
            {err&&<p className={style.err}>*{err}</p>}
            <label>Email</label>
            <input className={style.input} type='email' placeholder='Enter Email' ref={emailRef}/>
            <label>Password</label>
            <input className={style.input} type='password' placeholder='Enter Password' ref={pswdRef}/>
            <CustomButton btnText='SignIn' customStyle={style.customBtn} handleClick={handleSignIn}/>
            <CustomButton btnText='SignUp' customStyle={style.customBtn} handleClick={handleSignUp}/>
            <p className={style.forgotPswd} onClick={handleForgotPswd}>Forgot Password</p>
          </>
        
          : <>
            {err&&<p className={style.err}>*{err}</p>}
            <label>Email</label>
            <input className={style.input} type='email' placeholder='Enter Email' ref={emailRef}/>
            <label> New Password</label>
            <input className={style.input} type='password' placeholder='Enter Password' ref={pswdRef}/>
            <label>Confirm Password</label>
            <input className={style.input} type='password' placeholder='Enter Confirm Password' ref={cpswdRef}/>
            <CustomButton btnText='Reset Password' customStyle={style.customBtn} handleClick={handleResetPswd}/>
            <CustomButton btnText='Cancel' customStyle={style.customBtn} handleClick={handleCancel}/>
          </>
        }
      </form>
    </div>
  )
}


// 5-11 6HR CodeWars - 10, Leetcode - 5 
// 11-2 3HR Frontend Project and Assesments
// 3-7 4HR Frontend Project, Backend gothrough and Assesments
// 7-9 2HR Classes | codeWars - 5, leetcode - 3
// 9-11 2HR codeWars - 5, leetcode - 3

// Project->7HRS
// Coding->8HRS | 10HRS