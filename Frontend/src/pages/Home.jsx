import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import Test from "../components/Test";
import Reviews from "../components/Reviews";
import SoulfulSessions from "../components/SoulfulSessions";
import ChatBot from "../components/ChatBot";
import LiveSession from "../components/LiveSession";
import HowItWorks from "../components/HowWorks";
import Blog from "../components/Blog";

function Home() {
  return (
    <>
      <Test />
      <HeroSection />
      <HowItWorks />
      <LiveSession />
      <Blog />
      <ChatBot />
      <SoulfulSessions />
      <Reviews />
      <Footer />
    </>
  );
}
export default Home;
