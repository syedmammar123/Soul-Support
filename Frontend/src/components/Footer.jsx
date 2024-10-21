import {
  Facebook,
  GooglePlay,
  Instagram,
  Twitter,
  Whatsapp,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footerlink max-sm:text-sm">
          <div className="footerlinks">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/ai-chat">AI-Chat</Link>
              </li>
              <li>
                <Link to="/sessions">Sessions</Link>
              </li>
              

            </ul>
          </div>
          <div className="footerlinks">
            <ul>
              <li>
                <Link to="/">Services</Link>
              </li>
              <li>
                <Link to="/quiz">Assessment</Link>
              </li>
              
              <li>
                <Link to="/therapy">Therapy</Link>
              </li>
            </ul>
          </div>
          <div className="footerlinks">
            <ul>
              <li>
                <Link to="/blogs">Blog</Link>
              </li>
              <li>
                <Link to="/therapy">Appointment</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>                       
            </ul>
          </div>
        </div>

        <div className="icons">
          <Link to="https://www.facebook.com">
            <Facebook margin="10px" color="royalblue" size={26}/>
          </Link>
          <Link to="https://www.instagram.com">
            <Instagram color="#f8369a" size={26} />
          </Link>
          <Link to="https://www.twitter.com">
            <Twitter color="#08a0e9" size={26} />
          </Link>
          <Link to="https://play.google.com">
            <GooglePlay color="#3bccff" size={26} />
          </Link>
          <Link to="https://whatsapp.com">
            <Whatsapp color="#4fce5d" size={26} />
          </Link>
        </div>

        <br />
        <div className="footerpart">
          <p>ⓒ{new Date().getFullYear()} SoulSupport All rights reserved</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
