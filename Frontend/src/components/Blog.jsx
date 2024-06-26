import { Link, useNavigate } from 'react-router-dom';

function Blog() {
  const navigate = useNavigate();

  return (
    <section className=" blog3" style={{marginBottom:"128px", marginTop:"128px"}}>
      <div className="section3">
        <img src="images\bll.jpg" alt="" />
        <div className="overlay">
          <h1>Want To Read Something?</h1>
          <h3>
            Discover a treasure trove of wisdom in our blog section, curated by our team of professional therapists, offering transformative perspectives, evidence-based strategies, and self-care practices to enhance your mental well-being.
          </h3>
          <p>Access the Latest Mental Health Insights on Our Blog</p>
          <button onClick={()=>{navigate('/blogs')}} id="but" className="Heroooo_button">
            
            Read Blogs
          </button>
        </div>
      </div>
    </section>
  );
}

export default Blog;
