import { useState } from "react";
import Bar from "./Auth/Lognav";
import { Alert, Badge, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from 'axios'
import jwt_decode from 'jwt-decode'



function Publish(){
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [alert,setAlert] = useState(false)
    const navigate = useNavigate()

    async function handleSave(){
        const decoded = JSON.parse(localStorage.getItem('authTokens'));
        const token = decoded.access;
        const author = jwt_decode(decoded.access).user_id
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        const data = { 
            author:author,
            title:title,
            content:content,
        }

        try{       
        const response = await axios.post('http://localhost:8000/articles/publish/',data,config)
            if (response.status === 201){
                navigate('/')
            }else{
                setAlert(true)
            }
    }catch(error){
        console.log(error)
    }
    }


    function handleBack(){
        navigate('/')
    }

    return(
        <>
        <Bar/>
        <center className="mt-20">
        <h1 className="font-bold"> New Blog </h1>
        <br/>
        <h4 className="inline"><Badge bg="dark"> Title  </Badge></h4><input className='h-10 w-4/12 mr-3 ml-3 text-center p-1 rounded-xl text-dark mb-3'  value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <br/>
        <Container className="flex justify-center items-center">
        <h4 className="inline ml-0"><Badge bg="dark"> Content </Badge></h4><textarea className='whitespace-normal h-48 w-8/12  mr-3 ml-3 text-center p-5 rounded-xl text-dark mb-2'  value={content}    onChange={(e)=>setContent(e.target.value)}/>
        </Container><br/>
        <div className="flex justify-around w-1/3">
        <Button variant='danger'  onClick={handleBack} > Back  </Button>
        <Button variant='primary' onClick={handleSave}> Publish </Button>
        </div>


         <Alert variant='danger' className="w-1/4 ml-10 mt-5"style={{ display: alert ? 'block' : 'none ' }}> There Has been an issue, Check Again   </Alert>

        </center>

        </>

    )

}

export default Publish