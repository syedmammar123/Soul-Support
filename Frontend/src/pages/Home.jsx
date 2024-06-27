
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import Livesession from "../components/Livesession";
import Blog from "../components/Blog";
import Footer from "../components/Footer";
import Test from "../components/Test";
import Reviews from "../components/Reviews";
import SoulfulSessions from "../components/SoulfulSessions";
import ChatBot from "../components/ChatBot";

function Home() {
    return(
        <>
        {/* <Navbar/> */}
            <Test/>
            <HeroSection />
            <Blog/>
            <Livesession/>
            <HowItWorks/>
            <ChatBot/>
            <SoulfulSessions/>
            <Reviews/> 
            <Footer/>
        </>
    )
}
export default Home;