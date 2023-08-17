import { useEffect, useState } from "react"
import Bar from "./Auth/Lognav"
import { Alert, Badge, Button } from "react-bootstrap"
import { useNavigate } from "react-router"
import axios from "axios"
import jwt_decode from "jwt-decode"

function Pass(){

    const navigate = useNavigate()
    const [old,setOld] = useState('')
    const [newp,setNew] = useState('')
    const [confirmed,setConfirm] = useState('')
    const [dif,setDif] = useState(false)
    const [user,setUser] = useState('')
    const [done,setDone] = useState(false)

    useEffect(()=>{
        const decoded = JSON.parse(localStorage.getItem('authTokens'));
        setUser(jwt_decode(decoded.access).user_id);
    },[])

    async function handleSubmit(){
        if (confirmed === newp){
            const decoded = JSON.parse(localStorage.getItem('authTokens'));
            const token = decoded.access;
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            const data = {
                id: user,           
                old_password: old,
                new_password: newp
            };
        try{
        const response = await axios.patch("http://localhost:8000/auth/pass/",data,config)
        
        if(response.status === 200){
            setDone(true)
        }
    }
        catch(error){
            console.log(error)
        }
    }
        else{
            setDif(true)
        }
    }
return(<>
<Bar/>
<center className="mt-20">
<h1 className="mb-10"> Change Password </h1>
<h4 className="inline mt-2"><Badge bg='dark' className="text-light text-center"> Old Password </Badge></h4> <input value={old} type="text" className="unreadable-input h-10 w-2/12 mr-3 ml-3 text-center p-1 rounded-xl text-dark inline mb-3 mt-4" onChange={(e)=>setOld(e.target.value)} onFocus={()=>setDif(false)}/>
<br/>
<h4 className="inline mt-2"><Badge bg='dark' className="text-light text-center"> New Password </Badge></h4> <input value={newp}  className="unreadable-input h-10 w-2/12 mr-3 ml-3 text-center p-1 rounded-xl text-dark inline mb-3 mt-4" onChange={(e)=>setNew(e.target.value)} onFocus={()=>setDif(false)}/>
<br/>

<h4 className="inline mt-2"><Badge bg='dark' className="text-light text-center"> Confirm Password </Badge></h4> <input value={confirmed}  className="unreadable-input h-10 w-2/12 mr-3 ml-3 text-center p-1 rounded-xl text-dark inline mb-4 mt-4" onChange={(e)=>setConfirm(e.target.value)} onFocus={()=>setDif(false)}/>
<br/>

<div className="flex justify-around w-1/3">
<Button variant="danger" onClick={()=>navigate('/profile')}> Back </Button>

<Button variant="primary" onClick={handleSubmit}> Submit Changes </Button>
</div>

<Alert variant='danger' className="w-1/4 ml-10 mt-5"style={{ display: dif ? 'block' : 'none' }}> Passwords Dont Match! </Alert>
<Alert variant='success' className="w-1/4 ml-10 mt-5"style={{ display: done ? 'block' : 'none' }}> Password Changed! </Alert>



</center>

</>
)

}

export default Pass