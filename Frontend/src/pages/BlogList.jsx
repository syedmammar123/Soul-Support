import { Link,  useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Test from "../components/Test";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-creative';


// import './styles.css';
import { Autoplay, EffectFade, Pagination, Navigation, EffectCreative } from 'swiper/modules';


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

 const wave = {
  position: '',
  bottom: 0,
  left: 0,
  width: '100%',
  overflow: 'hidden',
  lineHeight: 0,
  transform: 'rotate(180deg)'
};

const svgStyle = {
  position: 'relative',
  display: 'block',
  width: 'calc(100% + 0px)',
  height: '44px'
};

const shapeFill = {
  fill: '#BBF7B0'
};



  useEffect(()=>{
    fetchData()
    },[]);
  
    return (
        <>


        {/* <BlogListHead/> */}
        <Test />
                <div className="bg-[#325343] text-center font-semibold text-white py-3 min-h-[48px]">
            Articles & Advice About Mental Health
        </div>

        <> 
        <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        grabCursor={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        // effect={'fade'}
        className="mySwiper"
      >
        <SwiperSlide>
          <div style={{width:"100%",height:"80vh",border:"",display:"flex",justifyContent:"space-around",alignItems:"center",flexWrap:"wrap" }} className='p-5'>
              
              <div style={{width:"60%",height:"70vh",display:"flex"}} className='font-mono text-4xl p-9 items-center'>Iff you're looking for support in your area, see how a nearby therapist can help.</div>
              <div style={{width:"40%",height:"70vh",display:"flex"}}>
                <div class="relative mx-auto pr-6 pb-6 before:absolute before:bottom-0 before:right-0 before:z-10 before:block before:h-[93px] before:w-[93px] before:rounded-tl-[320px] before:bg-[#A0CFCE] md:before:w-[88px] md:before:h-[88px] lg:before:w-[140px] lg:before:h-[140px]">
                <img className='h-full w-full rounded-[10px] rounded-tl-[128px] lg:rounded-tl-[160px] object-cover inline' src="images/blogHeader1.jpg" alt="" />

              </div>
              </div>
              
              {/* <div style={{border:"2px solid green",alignSelf:"flex-end"}}>...</div>   */}
                       
          </div>


        </SwiperSlide>
        <SwiperSlide>
          <div style={{width:"100%",height:"80vh",border:"",display:"flex",justifyContent:"space-around",alignItems:"center",flexWrap:"wrap" }} className='p-5 '>
              
              <div style={{width:"60%",height:"70vh",display:"flex"}} className='font-mono text-4xl p-9 items-center'>Learn how depression quotes can help during tough times.</div>
              <div style={{width:"40%",height:"70vh",display:"flex"}}>
                <div class="relative mx-auto pr-6 pb-6 before:absolute before:bottom-0 before:right-0 before:z-10 before:block before:h-[93px] before:w-[93px] before:rounded-tl-[320px] before:bg-[#A0CFCE] md:before:w-[88px] md:before:h-[88px] lg:before:w-[140px] lg:before:h-[140px]">
                <img className='h-full w-full rounded-[10px] rounded-tl-[128px] lg:rounded-tl-[160px] object-cover inline' src="images/blogHeader2.jpg" alt="" />

              </div>
              </div>
              
              {/* <div style={{border:"2px solid green",alignSelf:"flex-end"}}>...</div>   */}
                       
          </div>
        </SwiperSlide>
      </Swiper>
    </>       
           
          
          <div style={wave}>
                  <svg   style={svgStyle} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                      <path style={shapeFill} d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
                  </svg>
          </div>  
          
          <div className="flex items-center justify-around  w-[95%] m-auto flex-wrap">
            <div className="rounded border border-gray-200 text-center w-[30%] p-4 py-8 flex justify-between items-center flex-col h-[80vh] my-4">
             <div className="w-[100%] overflow-hidden rounded-lg" >
               <img src="https://dy7glz37jgl0b.cloudfront.net/advice/images/b0c659f3b45ab03ffbecf781f227798b-older-woman-speaks-on-phone-to-client_l.jpg" alt="" className="transform transition-transform duration-300 ease-in-out hover:scale-105 rounded-lg" />
             </div>
              <h6>How harnessing Will power To meet your goals can change your life.</h6>
              <p>text/category</p>

            </div>
            <div className="rounded border border-gray-200 text-center w-[30%] p-4 py-8 flex justify-between items-center flex-col h-[80vh] my-4">
             <div className="w-[100%] overflow-hidden rounded-lg" >
               <img src="https://dy7glz37jgl0b.cloudfront.net/advice/images/b0c659f3b45ab03ffbecf781f227798b-older-woman-speaks-on-phone-to-client_l.jpg" alt="" className="transform transition-transform duration-300 ease-in-out hover:scale-105 rounded-lg" />
             </div>
              <h6>How harnessing Will power To meet your goals can change your life.</h6>
              <p>text/category</p>

            </div>
            <div className="rounded border border-gray-200 text-center w-[30%] p-4 py-8 flex justify-between items-center flex-col h-[80vh] my-4">
             <div className="w-[100%] overflow-hidden rounded-lg" >
               <img src="https://dy7glz37jgl0b.cloudfront.net/advice/images/b0c659f3b45ab03ffbecf781f227798b-older-woman-speaks-on-phone-to-client_l.jpg" alt="" className="transform transition-transform duration-300 ease-in-out hover:scale-105 rounded-lg" />
             </div>
              <h6>How harnessing Will power To meet your goals can change your life.</h6>
              <p>text/category</p>

            </div>
            <div className="rounded border border-gray-200 text-center w-[30%] p-4 py-8 flex justify-between items-center flex-col h-[80vh] my-4">
             <div className="w-[100%] overflow-hidden rounded-lg" >
               <img src="https://dy7glz37jgl0b.cloudfront.net/advice/images/b0c659f3b45ab03ffbecf781f227798b-older-woman-speaks-on-phone-to-client_l.jpg" alt="" className="transform transition-transform duration-300 ease-in-out hover:scale-105 rounded-lg" />
             </div>
              <h6>How harnessing Will power To meet your goals can change your life.</h6>
              <p>text/category</p>

            </div>
            <div className="rounded border border-gray-200 text-center w-[30%] p-4 py-8 flex justify-between items-center flex-col h-[80vh] my-4">
             <div className="w-[100%] overflow-hidden rounded-lg" >
               <img src="https://dy7glz37jgl0b.cloudfront.net/advice/images/b0c659f3b45ab03ffbecf781f227798b-older-woman-speaks-on-phone-to-client_l.jpg" alt="" className="transform transition-transform duration-300 ease-in-out hover:scale-105 rounded-lg" />
             </div>
              <h6>How harnessing Will power To meet your goals can change your life.</h6>
              <p>text/category</p>

            </div>
            
          </div>

         <div className="home1">
          <div className="container">
        <div className="posts1">
          {blogs.reverse().map((item)=>(
            <div className="post" key={item.blogid}>
                <div className="img1">
                    <img src={item.img}></img>
                </div>
                <div className="content1">
                <Link href={`/blog/${item.blogid}`} >
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