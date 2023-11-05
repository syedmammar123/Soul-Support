
import axios from "axios";
import { useEffect, useState } from "react";
import { Link,  useNavigate,  useParams } from "react-router-dom";

const url = "https://img.freepik.com/free-photo/3d-render-medical-image-male-figure-with-brain-highlighted_1048-5873.jpg?w=740&t=st=1689418043~exp=1689418643~hmac=be14b5501fee079df99de9b77bb4cecaed4368d20487ba73c405f769b071f850"

const BlogSingle=()=>{
    const navigate = useNavigate()
    const [blog , setBlog] = useState([]);
    const { id } = useParams();

      var fake = [{
    blogid:1,
    blogtitle:"king",
    blogcontent:"adadadasd",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsLXGyRaOxv5DrjguRH_gABl43f4H2VCzdsQ&usqp=CAU"
  },{
    blogid:2,
    blogtitle:"king",
    blogcontent:"adadadasd",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsLXGyRaOxv5DrjguRH_gABl43f4H2VCzdsQ&usqp=CAU"
  },{
    blogid:3,
    blogtitle:"king",
    blogcontent:"adadadasd",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsLXGyRaOxv5DrjguRH_gABl43f4H2VCzdsQ&usqp=CAU"
  },{
    blogid:4,
    blogtitle:"king",
    blogcontent:"adadadasd",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsLXGyRaOxv5DrjguRH_gABl43f4H2VCzdsQ&usqp=CAU"
  },]

    const fetchData = async () => {
      fake.map((item)=>{
        if(item.blogid == id){
          setBlog(item)
        }
      })

    //     try {
    // const res = await axios.get(`http://localhost:4000/blogs/${id}`);
    //       setBlog(res.data);
    //       console.log(res.data);
    //     } catch (err) {
    //       console.log(err);
    //     }
      }     
     
      const handleDelete = async () => {
        // try {
        //  await axios.delete(`http://localhost:4000/blogs/${id}`);
        //   navigate("/blogs");
        // } catch (err) {
        //   console.log(err);
        // }
      };


      useEffect(()=>{
        fetchData()
        },[]);

    return(
        <>
        <div className="single">
            <div className="content1">
                <div className="contentImg">
                <img src={blog.img}></img></div>
                <div className="user">
                    <img src={url}></img>
                    <div className="info">
                        <span>JHON</span>
                        {blog.publishdate && (
                        <p>{blog.publishdate}</p>
                         )}
                    </div>
                    <div className="edit">
                    <Link to={`/write?edit=${blog.blogid}` } state={blog}>
                    <button>Edit</button>
                    </Link>
                    <button onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            
                <h1>{blog.blogtitle}</h1>
                
                <p>{blog.blogcontent}</p>
            </div>
       
        </div>
        </>
    )
}
export default BlogSingle;