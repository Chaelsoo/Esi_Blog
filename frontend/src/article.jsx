import { Alert, Badge, Button, Container } from "react-bootstrap"
import { useNavigate, useParams } from "react-router"
import Bar from "./Auth/Lognav"
import { useEffect, useState } from "react"
import axios from "axios"


function Article(){
    const navigate = useNavigate()
    const [title,setTitle] = useState('')
    const [author,setAuthor] = useState('')
    const [content,setContent] = useState('')
    const { id } = useParams()
    const [updated,setUpdated] = useState(false)
    const [failed,setFailed] = useState(false)


    

    function handleBack(){
        navigate('/')
    }

    async function handleDelete(){
        const decoded = JSON.parse(localStorage.getItem('authTokens'));
        const token = decoded.access;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        try{
            const response = await axios.delete(`http://localhost:8000/articles/${id}/`,config)
            navigate('/')
            }catch(error){
            console.log(error)
        }
    }

    async function handleSubmit(){
        const decoded = JSON.parse(localStorage.getItem('authTokens'));
        const token = decoded.access;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        const response = await axios.patch(`http://localhost:8000/articles/${id}/`,{
            title:title,
            content:content
        },config)
        console.log(response.status)
        if(response.status === 202){
            setUpdated(true)
        }else{
            setFailed(true)
        }
    }



    useEffect(()=>{
        async function get(){
            const decoded = JSON.parse(localStorage.getItem('authTokens'));
            const token = decoded.access;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };
            const response = await axios.get(`http://localhost:8000/articles/get/${id}/`,config)
            setAuthor(response.data.author)
            setContent(response.data.content)
            setTitle(response.data.title)
            }
        get()
    },[])


    return(
        <>
        <Bar/>
        <center className="mt-20">
        <h1 className="mb-4 font-bold"> Edit Article </h1>
        <h4 className="inline mt-2"><Badge bg='dark' className="text-light text-center"> Author </Badge></h4> <input value={author} onFocus={()=>{setUpdated(false); setFailed(false)}} className="h-10 w-2/12 mr-3 ml-3 text-center p-1 rounded-xl text-dark inline mb-3 mt-4" readOnly/>
        <br/>
        <h4 className="inline"><Badge bg="dark"> Title  </Badge></h4><input className='h-10 w-4/12 mr-3 ml-3 text-center p-1 rounded-xl text-dark mb-3' onFocus={()=>{setUpdated(false); setFailed(false)}} value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <br/>
        <Container className="flex justify-center items-center">
        <h4 className="inline ml-0"><Badge bg="dark"> Content </Badge></h4><textarea className='whitespace-normal h-48 w-8/12  mr-3 ml-3 text-center p-5 rounded-xl text-dark mb-2'  value={content} onFocus={()=>{setUpdated(false); setFailed(false)}} onChange={(e)=>setContent(e.target.value)}/>
        </Container><br/>
        <div className="w-1/3 flex justify-between">
        <Button variant="danger" className='ml-24 mb-3'onClick={handleBack}> Back </Button>
        <div>
        <Button variant="primary" className='mb-3' onClick={handleSubmit}> Save Settings  </Button>
        <Button variant="danger" className=" mb-3 ml-5" onClick={handleDelete}> Delete </Button>
        </div>
        </div>
        <Alert variant='success' className="w-1/4 ml-10 mt-5    "style={{ display: updated ? 'block' : 'none' }}>Article Updated!</Alert>
        <Alert variant='danger' className="w-1/4 ml-10 mt-5    "style={{ display: failed ? 'block' : 'none' }}> You've Exceeded the limits ! </Alert>


        </center>
        </>

    )
}

export default Article