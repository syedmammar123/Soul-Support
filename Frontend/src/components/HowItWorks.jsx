import { Card } from '@mui/material';
import { Link } from 'react-router-dom';

function HowItWorks() {
  return (
    <div className="How_Works">
      <div className="How_Text">
        <h1 className="How_h1">How Soul Support Works</h1>
      </div>
      <div className="Cards">
        <div className="Card1">
          <img src="images/reptile.png" alt="" />
          <h1>Self-Assessment</h1>
          <h3>Answer a few questions and receive personalized feedback instantly</h3>
        </div>
        <img className="arrow" src="images/arrow.png" alt="" />
        <div className="Card2">
          <img src="images/thera1.png" alt="" />
          <h1>Personalized Match</h1>
          <h3>Discover the right therapist for you, tailored to your mental health needs.</h3>
        </div>
        <img className="arrow" src="images/arrow.png" alt="" />
        <div className="Card3">
          <img src="images/start1.png" alt="" />
          <h1>Start Therapy</h1>
          <h3>Begin your healing journey with Online Therapy Sessions</h3>
        </div>
      </div>
      <button className="Hero_button">
        <Link to="/quiz" className="butn">
          Get Started
        </Link>
      </button>
    </div>
  );
}

export default HowItWorks;
