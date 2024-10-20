import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import Blog from "../components/Blog";
import Footer from "../components/Footer";
import Test from "../components/Test";
import Reviews from "../components/Reviews";
import SoulfulSessions from "../components/SoulfulSessions";
import ChatBot from "../components/ChatBot";
import LiveSession from "../components/LiveSession";

function Home() {
  return (
    <>
      <Test />
      <HeroSection />
      <Blog />
      <LiveSession />
      <HowItWorks />
      <ChatBot />
      <SoulfulSessions />
      <Reviews />
      <Footer />
    </>
  );
}
export default Home;
