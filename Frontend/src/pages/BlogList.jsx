import { Link,  useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const BlogList=()=>{
    const navigate = useNavigate();
  const [blogs , setBlogs] = useState([]);
  
  const fetchData = async () => {
    setBlogs(fake)
    // try {
    //   const res = await axios.get('http://localhost:4000/blogs');
    //   setBlogs(res.data);
    //   console.log(res.data);
    // } catch (err) {
    //   console.log(err);
    // }
  }
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

  useEffect(()=>{
    fetchData()
    },[]);
  
    return (
        <>
        {/* <BlogListHead/> */}
        <Navbar />

         <div className="home1">
          <div className="container">
        <div className="posts1">
          {blogs.reverse().map((item)=>(
            <div className="post" key={item.blogid}>
                <div className="img1">
                    <img src={item.img}></img>
                </div>
                <div className="content1">
                <Link to={`/blog/${item.blogid}`} >
                      <h1>{item.blogtitle}</h1>
                </Link>
                  <div className="text_container">
                      <p className="text">{ item.blogcontent}</p>
                  </div>
                  <div className="showmore">
                    <button onClick={()=>navigate(`/blog/${item.blogid}`)}>Read More</button>
                  </div>                    
                </div>
            </div>
          ))}
        </div>
        </div> 
        </div>
        {/* <BlogPage/> */}
       
             
        </>
    )
}
export default BlogList;