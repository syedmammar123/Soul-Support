import { useEffect, useState } from "react";
import { storage } from "../service/firebase";
import {v4} from 'uuid'
import {ref,uploadBytes,getDownloadURL} from "firebase/storage"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams,useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Test from "../components/Test";


const BlogWrite = () => {
    const location = useLocation();
    const state = location.state;

    console.log(state)
    const [blogContent, setBlogContent] = useState(state?.content || '' );
    const[blogTitle,setBlogTitle]= useState(state?.title  || '');
    const [imageUpload, setImageUpload] = useState( null);
    const [url,setUrl] = useState( state?.picUrl  || null);
    const navigate = useNavigate()
    


    const uploadImage = ()=>{
        if (imageUpload == null) return;
        toast("Uploading Image")
        const imageRef = ref(storage,`images/${imageUpload.name+v4()}`)
        uploadBytes(imageRef,imageUpload).then((url)=>{
            getDownloadURL(url.ref).then((url)=>{
                console.log(url)
                setUrl(url)
            })
        })

    }
    useEffect(()=>{
         uploadImage();
    },[imageUpload])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const body = { blogTitle, blogContent,url };
        state
        ? await axios.put(`http://localhost:4000/blogs/${state?.blogid}`,{ blogTitle, blogContent })
          :(
          await axios.post("http://localhost:4000/blogs", body) ) 
          window.location = "/";
        } catch (err) {
          console.log(err.message);
        }
      };
    
    return (
        <>

        <Test/>
        <div className="write-main-container">
            <div className="add">
                <div className="content">
                    <input type="text" placeholder="Title"  value={blogTitle} onChange={e=>setBlogTitle(e.target.value)}/>
                    
                    <div >
                        <textarea
                            className="editorContainer"
                            value={blogContent}
                            onChange={e=>setBlogContent(e.target.value)}
                        />
                    </div>
                </div>
              
                <div className="menu">
                    <div className="item">
                        <h1>Publish Blog</h1>
                        {url ? <div className="item">
                            <img src={url} alt="" />
                        </div>
                        :
                        <div>
                            <input type="file" id="file" onChange={(e)=>setImageUpload(e.target.files[0])}/>
                            <label className="file" htmlFor="file">Upload Image</label>
                        </div>
                        }   
                        <div className="buttons">
                            <button disabled={url === null } onClick={handleSubmit}>Publish</button>
                        </div>
                            <ToastContainer />
                    </div>                
                </div>
               
            </div>
            </div>
        </>
    )

}
export default BlogWrite;