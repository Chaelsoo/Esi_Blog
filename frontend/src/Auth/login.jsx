import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Bar from  './Lognav.jsx';
import axios from "axios"
import { Alert, Badge } from 'react-bootstrap';


function Login() {

    const [verify,setVerify] = useState(false)
    const [mail,setMail] = useState('')
    const [pass,setPass] = useState('')
    const [problem,setError] = useState(false)
    const navigate = useNavigate()

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        localStorage.clear()
    }, []);




    async function handleSubmit(e){
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8000/auth/login/',{
                email:mail,
                password:pass,
            })

            const resp = await axios.post('http://localhost:8000/api/token/',{
                email:mail,
                password:pass,
            })
            localStorage.setItem("authTokens",JSON.stringify(resp.data))
            navigate('/')
    } catch(error){   
        if (error.response.status === 403){
            setVerify(true)
        } 
        setError(true)
    }
    };

    return (
      
        <center>
              <Bar/>
            <br></br>
            <br></br>
            <br></br>
           
            <br></br>
             <br></br> 
            <br></br> 
            <br></br>
            <h1 className='text-3xl font-bold'> Login </h1>
            <div className='w-1/5 rounded-3xl  bg-violet-300 '>
            <br></br>

            <br></br>
            
            <form className="" onSubmit={handleSubmit}>
                <input onChange={(e)=> setMail(e.target.value)} onFocus={()=>setError(false)}  className=" text-black text-center block w-2/3 h-10 rounded shadow-lg shadow-indigo-500/50" type="text" placeholder="Email" />
                <br></br>

                <input onChange={(e)=> setPass(e.target.value)} className=" text-black text-center block w-2/3 h-10 rounded shadow-lg shadow-indigo-500/50" type="password" placeholder="Password" />
                <br></br> 
                <h4><Alert variant="danger" className={problem ? 'd-block w-4/5' : 'd-none'}> { verify ? "Email Not Verified !" : "Invalid Credentials !"} </Alert> </h4>



                <button type="submit" className='block rounded-lg bg-black w-2/3 h-10'>Login</button>
                <br></br>
                <span className='text-black'> Don't have an account ? Sign up <Link to="/auth/register" className='underline text-red-600'>Here. </Link></span>

                {/* <Link to='/'><button className='block rounded-lg bg-red-500 w-1/2 h-10'> Back </button> </Link> */}
            </form>
            <br></br>
            
            </div>
        </center>
    );
}

export default Login;
