import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Test from "../components/Test";
import Footer from "../components/Footer";
import { backendUrl } from "../constants";


const BlogSingle = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showControls, setShowControls] = useState(false);



  const fetchData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/v1/blogs`);
      const blogData = res.data.data.map(blog => ({
        ...blog,
        displaytext: blog.content.slice(0, 180),
      }));

      setBlogs(blogData);

      const foundBlog = blogData.find(item => item._id === id);
      setBlog(foundBlog || {});
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

    const fetchUserDetail = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/v1/users/getUser`);
      const data = response.data.message;
      if (data.role === "pro") {
        data._id === blog?.author
        setShowControls(true)        
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setShowControls(false)
        try {
          await axios.post(`${backendUrl}/api/v1/users/refresh-token`);
          await fetchUserDetail();
        } catch (refreshError) {
          
          // no user loggedIn
        }
      } else {
        console.error('Error occurred:', error);
      }
    }
  };



  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmed) return;

    try {
      await axios.delete(`${backendUrl}/api/v1/blogs/${blog._id}`);
      navigate("/therapist");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUserDetail();
     window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Test />

      <div className="single">
        <div className="content1">
          <h1>{blog?.title}</h1>
          <div className="contentImg">
            <img src={blog?.bannerPhoto} alt={blog?.title} />
          </div>
          <div className="user">
            <img src={blog.picUrl} alt="Author" />
            <div className="info">
              <span>{blog.name}</span>
              <div className="italic text-sm font-normal text-gray-600">{blog?.updatedAt?.slice(0, 10)}</div>
            </div>
            {showControls?
            <div className="edit flex items-center justify-between">
              <Link to={`/write?edit=${blog?._id}`} state={blog}>
                <button className="h-6 py-0 px-4 border rounded-lg hover:bg-gray-100 mx-2 text-base flex items-center">Edit</button>
              </Link>
              <button className="h-6 py-0 px-4 border rounded-lg hover:bg-gray-100 text-base flex items-center" onClick={handleDelete}>Delete</button>
            </div>
            
            :null}
            
          </div>

          <div>
            <p>{blog?.content}</p>
          </div>

          <br />
          <br />
          {showControls?null:
          <>
             <h4 className="font-bold text-2xl">Read More</h4>
          <div className="flex items-center justify-around w-[100%] m-auto flex-wrap">
            {blogs.reverse().map(item =>
              item._id !== id ? (
                <div className="group rounded border border-gray-200 text-center w-[350px] p-4 py-4 flex justify-between items-center flex-col h-[600px] my-4" key={item._id}>
                  <div className="w-72 h-52 overflow-hidden rounded-lg">
                    <img src={item.bannerPhoto} alt="" className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-105 rounded-lg" />
                  </div>
                  <h6 className="text-start font-semibold">{item.title}</h6>
                  <p className="text-start w-full">{item.displaytext}</p>
                  <div className="border p-2 hover:bg-green-100">
                    <button onClick={() => navigate(`/blog/${item._id}`)}>Read More</button>
                  </div>
                </div>
              ) : null
            )}
          </div>
          </>}
         
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogSingle;
