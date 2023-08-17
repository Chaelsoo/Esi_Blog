import { useEffect, useState } from "react"
import Bar from "./Lognav.jsx"
import { useNavigate } from "react-router"



 function confirm(){
   const navigate = useNavigate()


   function back(){
      navigate('../auth/register')
   }



   useEffect(() => {
      localStorage.clear()
  }, []);

  function login(){
   navigate('../auth/login')
  }

    return(<center>
    <Bar/>
    <br/>
    <br/>
    <br/>
    <br/>

    <h1 className="text-3xl"> Check out your email inbox</h1>
    <br/>
    <h1 className="text-3xl"> We've sent you a confirmation email </h1>
    <br/>
    <br/>

      <button className="w-1/6 h-10 bg-violet-900 rounded-xl" onClick={back}> Back </button>
      <br/>
      <br/>

      <button className="w-3/12 h-10 bg-violet-900 rounded-xl font-bold text-xl" onClick={login}> Login </button>
      <br/>
      <br/>



       </center>
    )

 }

 export default confirm