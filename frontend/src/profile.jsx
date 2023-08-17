import { useNavigate } from "react-router"
import Bar from "./Auth/Lognav"
import { Alert, Badge, Button, Container } from "react-bootstrap"
import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import axios from "axios"



function Profile(){

    const navigate = useNavigate()
    const [username,setUsername] = useState('')
    const [old,setOld] = useState('')
    const [email,setEmail] = useState('')
    const [user,setUser] = useState(null)
    const [same,setSame] = useState(false)
    const[done,setDone] = useState(false)
    const[Exists,setExists] = useState(false)



    useEffect(() => {
        const decoded = JSON.parse(localStorage.getItem('authTokens'));
        const user_id = jwt_decode(decoded.access).user_id; 
        setUser(user_id)
    
        async function info() {
            const decoded = JSON.parse(localStorage.getItem('authTokens'));
            const token = decoded.access;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };
            try {
                const response = await axios.get(`http://localhost:8000/auth/user/${user_id}/`,config);
                setUsername(response.data.username)
                setOld(response.data.username)
                setEmail(response.data.email)
            } catch (error) {
                console.error(error);
            }
        }
    
        info();
    }, []);


    async function handleSave(){
        if(old !== username){

    const data = {
        id:user,
        username:username
    }
    const decoded = JSON.parse(localStorage.getItem('authTokens'));
    const token = decoded.access;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    try{
    const response = await axios.patch('http://localhost:8000/auth/name/',data,config)
        setDone(true)
        setOld(username)
}
    catch(error){
        setExists(true)
    }}else{
        setSame(true)
    }
    }
     

     function handleBack(){
        navigate('/')
     }
    
    return (<> <Bar/>
    <center className="mt-20">

     <h1 className="font-bold"> Profile </h1>

     <h4 className="inline mt-2"><Badge bg='dark' className="text-light text-center"> Username </Badge></h4> <input value={username}  className="h-10 w-2/12 mr-3 ml-3 text-center p-1 rounded-xl text-dark inline mb-3 mt-4" onChange={(e)=>setUsername(e.target.value)} onFocus={()=>{setDone(false); setSame(false); setExists(false)}}/>
        <br/>
    <h4 className="inline"><Badge bg="dark"> Email </Badge></h4><input className='h-10 w-4/12 mr-3 ml-3 text-center p-1 rounded-xl text-dark mb-3' value={email}  readOnly/>
    <br/>
    <h4 className="inline"><Badge bg="dark"> Password  </Badge></h4><input className='h-10 w-2/12 mr-3 ml-3 text-center p-1 rounded-xl text-dark mb-3' value="************"  readOnly/> 
    <Button variant='dark' onClick={()=>{navigate('/pass')}}> Change Password </Button>


        <br/>


    <div className="flex justify-around w-1/3">
    <Button variant='danger'  onClick={handleBack} > Back  </Button>
    <Button variant='primary' onClick={handleSave}> Save Edit </Button>
    </div>
    <Alert variant='success' className="w-1/4 ml-10 mt-5"style={{ display: done ? 'block' : 'none' }}> Username Changed! </Alert>
    <Alert variant='danger' className="w-1/4 ml-10 mt-5"style={{ display: same ? 'block' : 'none' }}> Username Didnt Change!  </Alert>
    <Alert variant='danger' className="w-1/4 ml-10 mt-5"style={{ display: Exists ? 'block' : 'none' }}> Username Already Exists!   </Alert>



    </center>
    </>
    )
}

export default Profile