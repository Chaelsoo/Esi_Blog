import Bar from  './Lognav.jsx';
import React, { useEffect, useState } from 'react';
import { Alert, FormCheck } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"



function register(){
        
        const [mail,setMail] = useState('')
        const [pass,setPass] = useState('')
        const [user,setUser] = useState('')
        const [confirm,setConfirm] = useState('')
        const [dif,setDif] = useState(false)
        const [un,setUn] = useState(false)
        const navigate = useNavigate()
        const [IsPas,setIs] = useState(false)


        useEffect(() => {
          localStorage.clear()
      }, []);

        const handleInputFocus = () => {
          if (dif) {
            setDif(false);
            setIs(false);
          }
        };


        async function handleSubmit(e) {
            e.preventDefault();
            if (confirm !== pass){
              setDif(true)
              return
            }else{
            try{
            const response = await axios.post('http://localhost:8000/auth/register/',{
              email:mail,
              password:pass,
              username:user,
            })

             navigate("/auth/confirm");
            }catch(error){  
              console.log(error.response.data)
              setUn(true)
              if(error.response.status === 401){
                setIs(true)
              }
              
              }}
        };

 return(

    <center>
    <Bar/>
  <br></br>
  <br></br>
  <br></br>
 
  <br></br> <br></br> <br></br>
  <h2 className='text-3xl font-bold'> Register </h2>
  <div className='w-1/5 rounded-3xl  bg-violet-300 '>
  <br></br>

  <br></br>
  <form className="" onSubmit={handleSubmit}>
      <input onChange={((e)=>setMail(e.target.value))} onFocus={handleInputFocus}className=" text-black text-center block w-2/3 h-10 rounded shadow-lg shadow-indigo-500/50" type="text" placeholder="Email" />
      <br></br>
      <input onChange={((e)=>setUser(e.target.value))} onFocus={handleInputFocus} className=" text-black text-center block w-2/3 h-10 rounded shadow-lg shadow-indigo-500/50" type="text" placeholder="Username" />
      <br></br>


      <input onChange={(e)=>setPass(e.target.value)} onFocus={handleInputFocus}className=" text-black text-center block w-2/3 h-10 rounded shadow-lg shadow-indigo-500/50" type="password" placeholder="Password" />
      <br></br>
  
      <input onChange={(e)=>setConfirm(e.target.value)} onFocus={handleInputFocus} className=" text-black text-center block w-2/3 h-10 rounded shadow-lg shadow-indigo-500/50" type="password" placeholder="Confirm Password" />
      <br></br> 

      <h5><Alert variant="danger" className={dif ? 'd-block w-4/5' : 'd-none'}> Passwords Dont Match ! </Alert> </h5>
      <h5><Alert variant="danger" className={un ? 'd-block w-4/5' : 'd-none'}> {IsPas ? 'Password Too Weak !': 'Email/Username Already Exists !'} </Alert> </h5>


      

      <button type="submit" className='block rounded-lg bg-black w-2/4 h-10'> Sign Up </button>
      {/* <Link to='/'><button className='block rounded-lg bg-red-500 w-1/2 h-10'> Back </button> </Link> */}
  </form>
  <br></br>

  <span className='text-black'> Already have an account  ? Sign in <Link to="/auth/login" className='underline text-red-600'>Here. </Link></span>
  <br></br>
  <br></br>

  
  </div>
</center>
 )
}

export default register;