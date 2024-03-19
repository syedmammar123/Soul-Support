
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import Reviews from '../components/Reviews';
import Chatbot from "../components/chatbot";
import Livesession from "../components/Livesession";
import Blog from "../components/Blog";
import Instructor from "../components/Instructor";
import Footer from "../components/Footer";
import Test from "../components/Test";

function Home() {
    return(
        <>
        {/* <Navbar/> */}
        <Test/>
        <HeroSection />
        <Blog/>
        {/* <Livesession/> */}
        <HowItWorks/>
        {/* <Chatbot/> */}
       <Instructor/>
         <Reviews/> 
        <Footer/>
        </>
    )
}
export default Home;