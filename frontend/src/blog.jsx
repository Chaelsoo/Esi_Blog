import { useEffect, useState } from "react";
import { Badge, Container } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router";





const Bloglist = ({blogs,user}) => {
    const navigate = useNavigate()
    function handleEdit(id){
        navigate(`/article/${id}`)
    }
    const [hoveredBlogId, setHoveredBlogId] = useState(null);

    
    return ( 
        <div className="blogs-list">
        
        {blogs.map((blog)=>(
            <div className="blog grid mb-4" key={blog.id}
            onMouseEnter={() => setHoveredBlogId(blog.id)}
            onMouseLeave={() => setHoveredBlogId(null)}>
                <span className="flex justify-between">               
                 <h5 className="me font-bold inline w-1/2"> {blog.title} </h5>
                <h3 className="font-bold inline ml-auto"> { blog.author }</h3>
                </span>

                <hr className="none"/>
                

                {blog.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
                ))}


                {user === blog.author ? (
                        <h4 className="ml-auto cursor-pointer">
                            <Badge bg="dark"
                                onClick={() => handleEdit(blog.id)}
                                style={{ display: hoveredBlogId === blog.id ? "inline-block" : "none", cursor: "pointer" }}
                            >
                                Edit
                            </Badge>
                        </h4>
                    ) : null}
            </div>

        ))}
        <br/>
        <br/>

    </div>

     );
}
 
export default Bloglist;

