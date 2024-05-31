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
import Footer from "../components/Footer";


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
            {blogs.reverse().map((item)=>(            
                <div className="group rounded border border-gray-200 text-center w-[30%] p-4 py-4 flex justify-between items-center flex-col h-[500px] my-4">
                  <div className="w-72 h-52 bg-red-500 overflow-hidden rounded-lg" >
                    <img src={item.img} alt="" className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-105 rounded-lg" />
                  </div>
                  <h6 className="text-start font-semibold">{item.blogtitle}</h6>
                  
                  <p className="text-start w-full" >{item.displaytext}</p>
                  
                  <div className="border p-2 hover:bg-green-100 ">
                    <button onClick={()=>navigate(`/blog/${item.blogid}`)}>Read More</button>
                  </div>
                </div>
            ))}
          </div>

          <Footer/>
        
        {/* <BlogPage/> */}
       
             
        </>
    )
}
export default BlogList;