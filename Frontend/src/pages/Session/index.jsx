import Footer from "../../components/Footer";
import LiveSession from "../../components/LiveSession";
import Test from "../../components/Navbar";

const Session = () => {
  return (
    <div>
      <Test />
      {/* Happening now! */}
      <br />
      <LiveSession />
      <Footer />
    </div>
  );
};

export default Session;
