import { Link } from 'react-router-dom';


function HeroSection() {
  return (
    <section id="header" className="Hero max-w-screen bg-ck">
      <div className="HeroPg">
        <div className="Text">
          <h1 className="Hero_h1 max-sm:text-base">
            Transforming Lives, Restoring Hope
          </h1>
          <h2 className="Hero_h2 mt-4 mb-4">
            Welcome to Soul Support, your destination for comprehensive mental
            health resources and support. Explore a wealth of knowledge on
            various mental health topics, including symptoms, tips, and
            treatment options. Connect with a supportive community of
            individuals who understand your experiences, and find solace in
            shared stories. Access professional online counseling, discover a
            directory of trusted mental health professionals, and utilize our
            self-assessment tool for personalized insights. Begin your path to
            inner peace and well-being today with Soul Support.
          </h2>
          <button className="Hero_btn">
            <Link to="/therapy" className="btnn">
              Start Therapy
            </Link>{" "}
          </button>
        </div>
        <div className="Image">
          <img
            className="Hero_img max-sm:w-18 max-sm:h-18"
            src="images/v412.png"
            alt="no img"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
