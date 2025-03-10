import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {

  const [state,setState] = useState("Sign Up");
  const [formData, setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const login = async()=>{
    console.log("Login Function Executed",formData);
    let responseData;
    await fetch('http://localhost:4000/login ',{
      method:'POST',
      headers:{
        Accept : 'application/form-data',
        'content-type' : 'application/json',
      },
     body:JSON.stringify(formData)
    }).then((response)=>response.json()).then((data)=>responseData=data);

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors);
    }

  }

  const signup = async()=>{
    console.log("Sign Up Function Executed",formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept : 'application/form-data',
        'content-type' : 'application/json',
      },
     body:JSON.stringify(formData)
    }).then((response)=>response.json()).then((data)=>responseData=data);

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors);
    }

  }
  

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? <input type="text" name='username' value={FormData.username} onChange={changeHandler} placeholder='Your name' /> : <></>}
          <input type="text" name='email' value={formData.email} onChange={changeHandler} placeholder=' Email Address' />
          <input type="text" name='password' value={formData.password} onChange={changeHandler} placeholder='Password' />
        </div>
        <button onClick={()=>{state === "Login" ? login() : signup}}>Continue</button>
        {state === "Sign Up" ? <p className='loginsignup-login'>Already have an account <span onClick={()=>{setState("Login")}}>Login here</span></p> :
         <p className='loginsignup-login'>Create an Account <span onClick={()=>{setState("Sign Up")}}>Click Here</span></p>
        }
        
       
      
      <div className="loginsignup-agree">
        <input type="checkbox" name='' id=''  />
        <p>By continuing, i agree to the terms of use & privacy policy</p>
      </div>
      
    </div>
    </div>
  )
}

export default LoginSignup
