import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Test from "../components/Test";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/effect-creative";

// import './styles.css';
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import Footer from "../components/Footer";
import useBlogs from "../hooks/useBlogs";

const BlogList = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const { fetchData, loading } = useBlogs();
  const wave = {
    position: "",
    bottom: 0,
    left: 0,
    width: "100%",
    overflow: "hidden",
    lineHeight: 0,
    transform: "rotate(180deg)",
  };

  const svgStyle = {
    position: "relative",
    display: "block",
    width: "calc(100% + 0px)",
    height: "44px",
  };

  const shapeFill = {
    fill: "#BBF7B0",
  };

  useEffect(() => {
    fetchData(setBlogs);
  }, []);

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
          effect={"creative"}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ["100%", 0, 0],
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
            <div
              style={{
                width: "100%",
                border: "",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                flexWrap: "wrap",
              }}
              className="h-[80vh] p-5 max-sm:h-[40vh]"
            >
              <div
                style={{ height: "70vh" }}
                className="w-[60%] h-[70vh] font-mono text-4xl p-9 max-sm:w-full max-sm:h-full text-center sm:flex sm:items-center"
              >
                {
                  "If you're looking for support in your area, see how a nearby therapist can help."
                }
              </div>
              <div style={{ width: "40%", height: "70vh", display: "flex" }}>
                <div className="max-sm:hidden relative mx-auto pr-6 pb-6 before:absolute before:bottom-0 before:right-0 before:z-10 before:block before:h-[93px] before:w-[93px] before:rounded-tl-[320px] before:bg-[#A0CFCE] md:before:w-[88px] md:before:h-[88px] lg:before:w-[140px] lg:before:h-[140px]">
                  <img
                    className="h-full w-full rounded-[10px] rounded-tl-[128px] lg:rounded-tl-[160px] object-cover inline"
                    src="images/blogHeader1.jpg"
                    alt=""
                  />
                </div>
              </div>

              {/* <div style={{border:"2px solid green",alignSelf:"flex-end"}}>...</div>   */}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              style={{
                width: "100%",
                border: "",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                flexWrap: "wrap",
              }}
              className="h-[80vh] p-5 max-sm:h-[40vh]"
            >
              <div
                style={{ height: "70vh" }}
                className="w-[60%] h-[70vh] font-mono text-4xl p-9 max-sm:w-full max-sm:h-full text-center sm:flex sm:items-center"
              >
                Learn how depression quotes can help during tough times.
              </div>
              <div style={{ width: "40%", height: "70vh", display: "flex" }}>
                <div className="max-sm:hidden relative mx-auto pr-6 pb-6 before:absolute before:bottom-0 before:right-0 before:z-10 before:block before:h-[93px] before:w-[93px] before:rounded-tl-[320px] before:bg-[#A0CFCE] md:before:w-[88px] md:before:h-[88px] lg:before:w-[140px] lg:before:h-[140px]">
                  <img
                    className="h-full w-full rounded-[10px] rounded-tl-[128px] lg:rounded-tl-[160px] object-cover inline"
                    src="images/blogHeader2.jpg"
                    alt=""
                  />
                </div>
              </div>

              {/* <div style={{border:"2px solid green",alignSelf:"flex-end"}}>...</div>   */}
            </div>
          </SwiperSlide>
        </Swiper>
      </>

      <div style={wave}>
        <svg
          style={svgStyle}
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            style={shapeFill}
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      {loading && (
        <div className="w-full text-center">
          <p>Loading...</p>
        </div>
      )}
      <div className="flex items-center justify-around  w-[95%] m-auto flex-wrap max-lg:flex-col">
        {blogs.reverse().map((item, index) => (
          <div
            key={index}
            className="group rounded border border-gray-200 text-center w-[30%] p-4 py-4 flex justify-between items-center flex-col h-[500px] my-4 max-lg:w-[90%] max-lg:mx-auto max-lg:shadow-lg"
          >
            <div className="w-72 h-52 bg-gray-300 overflow-hidden rounded-lg">
              <img
                src={item.bannerPhoto}
                alt=""
                className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-105 rounded-lg"
              />
            </div>
            <h6 className=" font-semibold font-serif text-center">{item.title}</h6>

            <p className="text-start w-full font-serif ">{item.displaytext}...</p>

            <div className="border p-2 hover:bg-green-100 ">
              <button onClick={() => navigate(`/blog/${item._id}`)}>
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      <Footer />

      {/* <BlogPage/> */}
    </>
  );
};
export default BlogList;
