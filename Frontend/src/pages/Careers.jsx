import React from 'react';
import {  Facebook,  Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import Navbar from '../components/Navbar';

const url = "https://img.freepik.com/free-photo/medium-shot-smiley-doctor-with-crossed-arms_23-2149355015.jpg?w=900&t=st=1689674186~exp=1689674786~hmac=5321cfcea761752bf2bcf7515d26d7a67a7c7b97f412fe55009400bd75dc4fd7";

const Careers = () => {
  return (
    <>
      <header className="backImg">
        <Navbar />
        <h1 className="car">Careers</h1>
      </header>
      <section className="aboutUs">
        <div className="row">
          <div className="aboutCol">
            <h1>Join Our Team of Compassionate Therapists</h1>
            <p>
              Make a difference in the lives of others by joining our team of dedicated therapists. As a therapist at our mental health website, youll have the opportunity to connect with clients worldwide, provide professional support, and contribute to the growth and well-being of individuals seeking therapy. Join us and be part of a community committed to making a positive impact on mental health.
            </p>
            <a href="" className="heroBtn redBtn">
              Join Us!
            </a>
            <br />
            <p>Send Your Resume at <a href='#'>SoulSupport@gmail.com</a></p>
          </div>
          <div className="aboutCol">
            <img src={url} alt="About" />
          </div>
        </div>
      </section>

      <footer className="footer">
        <h4>Connect with Us</h4>
        <p>
          Stay connected with us on social media to receive updates, resources, and inspiration for your mental well-being journey.
          <br />
          Follow us on Facebook, Instagram, Twitter, and LinkedIn to join our supportive community.
        </p>
        <div className="icons">
          <Facebook />
          <Instagram />
          <Twitter />
          <LinkedIn />
        </div>
      
      </footer>
    </>
  );
};

export default Careers;
