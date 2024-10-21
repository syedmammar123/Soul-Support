import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";

import Test from "../components/Test";

const url =
  "https://img.freepik.com/free-photo/medium-shot-smiley-doctor-with-crossed-arms_23-2149355015.jpg?w=900&t=st=1689674186~exp=1689674786~hmac=5321cfcea761752bf2bcf7515d26d7a67a7c7b97f412fe55009400bd75dc4fd7";

const Careers = () => {
  return (
    <>
      <Test />
      <header className="backImg h-[70vh] max-sm:max-h-[40vh]">
        <h1 className="car">Careers</h1>
      </header>
      <section className="w-[80%] m-auto">
        <div className="row">
          <div className="aboutCol ">
            <h1 className="mb-2 font-semibold">
              Join Our Team of Compassionate Therapists
            </h1>
            <p className="mb-2">
              Make a difference in the lives of others by joining our team of
              dedicated therapists. As a therapist at our mental health website,
              youll have the opportunity to connect with clients worldwide,
              provide professional support, and contribute to the growth and
              well-being of individuals seeking therapy. Join us and be part of
              a community committed to making a positive impact on mental
              health.
            </p>
            <a
              href="#"
              className="heroBtn redBtn"
              onClick={(event) => event.preventDefault()}
            >
              Join Us!
            </a>
            <br />
            <p className="italic ">
              Send Your Resume at{" "}
              <span
                href="#"
                className="text-lg underline font-semibold text-green-400"
              >
                SoulSupport@gmail.com
              </span>
            </p>
          </div>
          <div className="aboutCol ">
            <img src={url} className="rounded-md shadow-lg" alt="About" />
          </div>
        </div>
      </section>

      <footer className="footer py-4 ">
        <h4>Connect with Us</h4>
        <br />
        <p className="max-sm:text-sm max-sm:px-5">
          Stay connected with us on social media to receive updates, resources,
          and inspiration for your mental well-being journey.
          <br />
          Follow us on Facebook, Instagram, Twitter, and LinkedIn to join our
          supportive community.
        </p>
        <br />
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
