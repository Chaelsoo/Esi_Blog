import { useEffect, useState } from "react";
import Bloglist from "./blog.jsx";
import Nav from "./nav.jsx";
import axios from 'axios'
import { Badge, Button } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import Publish from "./publish.jsx";
import { useNavigate } from "react-router";




const Home = function(){
    const[blogs,setBlogs] = useState([])
    const [filtered,setFiltered] = useState([])
    const [checked,setCheck] = useState(true)
    const [su,setSuper] = useState('')

    const navigate = useNavigate()


    async function getarticles(){
        const decoded = JSON.parse(localStorage.getItem('authTokens'));
        const token = decoded.access;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        try{
            const response = await axios.get('http://localhost:8000/articles/',config)
           setBlogs(response.data)
        }
        catch(error){
            console.log(error.response)
        }
    }


    useEffect(()=>{
       getarticles()
        const decoded = JSON.parse(localStorage.getItem('authTokens'))



        async function getSuper(){
            const decoded = JSON.parse(localStorage.getItem('authTokens'));
            const token = decoded.access;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };
        try{
            const response = await axios.get('http://localhost:8000/auth/current/',config)
            setSuper(response.data)
        }catch(error){
            console.log(error)
        }
    
        

        }
        getSuper()

    },[])

    function get(){
        setCheck(!checked)
        if (checked){
            setFiltered(blogs.filter((blog)=>{ 

                return blog.author === su}))
        }
    }

        

    function pub(){
        navigate('publish/')
    }





return(
    <>
     <Nav/>
    <div className="content home">
    <div className="flex justify-between">
    <h4 >
    <Badge bg='secondary' className="text-xl cursor-pointer" onClick={pub}>
    + New Blog
    </Badge> </h4>
    <h4 className="flex justify-end ">
    <Badge bg='secondary' className="text-xl ">
    <input className="mr-2 cursor-pointer" type="checkbox"  value={checked} onChange={get}/>
    My Articles
    </Badge> </h4>
    </div>


    <Bloglist blogs={checked ? blogs : filtered} user={su}/>
     </div>


     </>


);




};

export default Home;