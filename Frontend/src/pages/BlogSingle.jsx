import axios from "axios";
import { useEffect, useState } from "react";
import { Link,  useNavigate,  useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Test from "../components/Test";
import Footer from "../components/Footer";


const url = "https://img.freepik.com/free-photo/3d-render-medical-image-male-figure-with-brain-highlighted_1048-5873.jpg?w=740&t=st=1689418043~exp=1689418643~hmac=be14b5501fee079df99de9b77bb4cecaed4368d20487ba73c405f769b071f850"

const BlogSingle=()=>{
    const navigate = useNavigate()
    const [blogs , setBlogs] = useState([]);
    const [blog , setBlog] = useState([]);
    const { id } = useParams();


    var fake = [{
    blogid:1,
    blogtitle:"How harnessing Will power To meet your goals can change your life.",
    blogcontent:"adadadasd",
    displaytext: "Harnessing your willpower can significantly change your life. By setting clear goals and consistently working towards them, you can achieve more than you ever thought possible.",
    img:"https://dy7glz37jgl0b.cloudfront.net/advice/images/betterhelp/223/1acf4b28bfa15e79e7124e9553ad18ad-getty-sarah-waiswa_l.jpg"
  },{
    blogid:2,
    blogtitle:"How harnessing Will power To meet your goals can change your life.",
    blogcontent:"adadadasd",
    displaytext: "Harnessing your willpower can significantly change your life. By setting clear goals and consistently working towards them, you can achieve more than you ever thought possible.",
    img:"https://dy7glz37jgl0b.cloudfront.net/advice/images/341c509086ff5067842a0d7027315868-girl-holding-mug-smiling-by-computer_l.jpg"
  },{
    blogid:3,
    blogtitle:"How harnessing Will power To meet your goals can change your life.",
    blogcontent:"adadadasd",
    displaytext: "Harnessing your willpower can significantly change your life. By setting clear goals and consistently working towards them, you can achieve more than you ever thought possible.",
    img:"https://dy7glz37jgl0b.cloudfront.net/advice/images/c85803a0a82bfdd0ee3b4ceb69d7d5dc-man-in-a-hotel-lobby-scrolls-on-phone_l.jpg"
  },{
    blogid:4,
    blogtitle:"How harnessing Will power To meet your goals can change your life.",
    blogcontent:"adadadasd",
    displaytext: "Harnessing your willpower can significantly change your life. By setting clear goals and consistently working towards them, you can achieve more than you ever thought possible.",
    img:"https://assets.betterhelp.com/advice/images/5913aafdde4749275f5d0ec56395ac56-solos-sad_59_l.jpg"
  },]

    const fetchData = async () => {
    // setBlogs(fake)
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/blogs`);
      for (let i = 0; i < res.data.data.length; i++) {
        let slicedContent = (res.data.data[i].content).slice(0,180)
        res.data.data[i].displaytext = slicedContent
        
      }
      let blogData = res.data.data
      setBlogs(blogData);

      blogData.map((item)=>{
        if(item._id == id){
          setBlog(item)
        }
      })

      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
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
        <Test></Test>
        
        <div className="single">
            <div className="content1">
              <h1>{blog.title}</h1>
                <div className="contentImg">
                  <img src={blog.bannerPhoto}></img>
                </div>
                <div className="user">
                    <img src={url}></img>
                    <div className="info">
                        <span>JHON</span>
                        <p>{blog.updatedAt.slice(0,10)}</p>
                         
                    </div>
                    <div className="edit">
                    <Link to={`/write?edit=${blog._id}` } state={blog}>
                    <button className="p-1 px-4 border rounded-lg hover:bg-gray-100 mx-2">Edit</button>
                    </Link>
                    <button className="p-1 px-4 border rounded-lg hover:bg-gray-100" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            
                
                
                <div>
                <p>{blog.content}</p>
                </div>

                
                         <br />
                         <br />
                         <h4 className="font-bold text-2xl ">Read More</h4>
                <div className="flex items-center justify-around  w-[100%] m-auto flex-wrap">
                  {blogs.reverse().map((item)=>( 
                      item._id!=id ?
                      <div className="group rounded border border-gray-200 text-center w-[350px] p-4 py-4 flex justify-between items-center flex-col h-[600px] my-4">
                        <div className="w-72 h-52 overflow-hidden rounded-lg" >
                          <img src={item.bannerPhoto} alt="" className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-105 rounded-lg" />
                        </div>
                        <h6 className="text-start font-semibold">{item.title}</h6>
                        
                        <p className="text-start w-full" >{item.displaytext}</p>
                        
                        <div className="border p-2 hover:bg-green-100 ">
                          <button onClick={()=>navigate(`/blog/${item._id}`)}>Read More</button>
                        </div>
                      </div>
                      :
                      null
                    
                  ))}
               </div>

            </div>
            

        </div>
               <Footer/>

        </>
    )
}
export default BlogSingle;