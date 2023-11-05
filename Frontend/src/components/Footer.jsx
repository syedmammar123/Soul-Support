import {
  Facebook,
  Google,
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
        <div className="footerlink">
          <div className="footerlinks">
            <ul>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/background">Background</Link>
              </li>
              <li>
                <Link to="/team">Team</Link>
              </li>
              <li>
                <Link to="/benefits">Benefits</Link>
              </li>
            </ul>
          </div>
          <div className="footerlinks">
            <ul>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/assessment">Assessment</Link>
              </li>
              <li>
                <Link to="/appointment">Appointment</Link>
              </li>
              <li>
                <Link to="/therapy">Therapy</Link>
              </li>
            </ul>
          </div>
          <div className="footerlinks">
            <ul>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/science">Science</Link>
              </li>
              <li>
                <Link to="/psychological">Psychological</Link>
              </li>
              <li>
                <Link to="/nutrition">Nutrition</Link>
              </li>
            </ul>
          </div>

          <div className="icons">
            <Link to="https://www.facebook.com">
              <Facebook margin="10px" color="royalblue" size={26} />
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
            <Link to="https://web.whatsapp.com">
              <Whatsapp color="#4fce5d" size={26} />
            </Link>
          </div>
        </div>
        <div className="footerpart">
          <p>ⓒ2023 SoulSupport All rights reserved</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
