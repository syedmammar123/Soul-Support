
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import Chatbot from "../components/chatbot";
import Livesession from "../components/Livesession";
import Blog from "../components/Blog";
import Footer from "../components/Footer";
import Test from "../components/Test";
import Reviews from "../components/Reviews";
import SoulfulSessions from "../components/SoulfulSessions";

function Home() {
    return(
        <>
        {/* <Navbar/> */}
        <Test/>
        <HeroSection />
        <Blog/>
        <Livesession/>
        <HowItWorks/>
        {/* <Chatbot/> */}
       <SoulfulSessions/>
         <Reviews/> 
        <Footer/>
        </>
    )
}
export default Home;