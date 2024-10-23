import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {  useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Test from "../components/Test";
import { backendUrl } from "../constants";

const BlogWrite = () => {
    const location = useLocation();
    const state = location.state;
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('edit');

    const [blogContent, setBlogContent] = useState(state?.content || '');
    const [blogTitle, setBlogTitle] = useState(state?.title || '');
    const [imageUpload, setImageUpload] = useState(null);
    const [url, setUrl] = useState(state?.bannerPhoto || null);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/v1/blogs/${query}`);
            const blogData = res.data.data;

            setBlog(foundBlog || {});
        } catch (err) {
            console.error(err);
            setError("Failed to fetch data");
        }
    };

    const fetchUserDetail = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/v1/users/getUser`);
            const data = response.data.message;
            if (data.role !== "pro") {
                navigate("/blogs")
            }

            if(data._id === blog?.author){
                navigate("/therapist")
            }

        } catch (error) {
            if (error.response && error.response.status === 401) {
                
                try {
                    await axios.post(`${backendUrl}/api/v1/users/refresh-token`);
                    await fetchUserDetail();
                } catch (refreshError) {
                    navigate(`/login/therapist`);
                    
                }
            } else {
                console.error('Error occurred:', error);
            }
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        
        if (file) {
            setImageUpload(file);
            // let temp = URL.createObjectURL(file)
            // setPreviewBanner(file)
            // setUrl(temp)
            
        }
    };



    const uploadImage = () => {
        if (imageUpload == null) return;
        toast.success("Uploading Image");
        
        setUrl(URL.createObjectURL(imageUpload))
    };
    // const uploadImage = () => {
    //     if (imageUpload == null) return;
    //     toast("Uploading Image");
    //     const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    //     uploadBytes(imageRef, imageUpload).then((url) => {
    //         getDownloadURL(url.ref).then((url) => {
    //             console.log(url);
    //             setUrl(url);
    //         });
    //     });
    // };

    useEffect(() => {
        uploadImage();
    }, [imageUpload]);

    const handleSubmit = async (e) => {
        e.preventDefault();
            const formData = new FormData()
            formData.append("title",blogTitle)
            formData.append("content",blogContent)
            formData.append("category",["Depression"])
            if (imageUpload) {
                formData.append('bannerPhoto', imageUpload);
            }
        
        
        
        try {
            
            const body = formData;

            if (state) {
                await axios.put(`${backendUrl}/api/v1/blogs/${state?._id}`, { blogTitle, blogContent });
                
            } else {
                await axios.post(`${backendUrl}/api/v1/blogs`, body,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                toast.success("Blog Uploaded Successfully!");
            }
            toast.success(`${state ? "Blog Updated Successful!" : "Blog Uploaded Successfully!"}`);
            setTimeout(()=>{
                navigate("/therapist");
            },2000)
            
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <>
            <Test />
            <div className="write-main-container">
                <div className="add">
                    <div className="content">
                        <input type="text" placeholder="Title" value={blogTitle} onChange={e => setBlogTitle(e.target.value)} />
                        
                        <div>
                            <textarea
                                className="editorContainer"
                                value={blogContent}
                                onChange={e => setBlogContent(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className="menu">
                        <div className="item">
                            <h1>Publish Blog</h1>
                            {url ? (
                                <div className="item">
                                    <img src={url} alt="" />
                                    
                                </div>
                            ) : (
                                <div>
                                    <input type="file" id="file" onChange={handleImageChange} />
                                    <label className="file" htmlFor="file">Upload Image</label>
                                </div>
                            )}
                            <div className="buttons">
                                <button disabled={url === null} onClick={handleSubmit}>Publish</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogWrite;
