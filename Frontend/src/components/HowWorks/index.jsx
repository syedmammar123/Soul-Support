// import React from "react";
// import { Link } from "react-router-dom";
// import styles from "./index.module.css"; // Import the CSS module

// function HowItWorks() {
//   return (
//     <div className={styles.How_Works}>
//       <div className={styles.How_Text}>
//         <h1 className={styles.How_h1}>How Soul Support Works</h1>
//       </div>
//       <div className={styles.Cards}>
//         <div className={styles.Card1}>
//           <img src="images/reptile.png" alt="" />
//           <h1>Self-Assessment</h1>
//           <h3>Answer a few questions and receive personalized feedback instantly</h3>
//         </div>
//         <img className={styles.arrow} src="images/arrow.png" alt="" />
//         <div className={styles.Card2}>
//           <img src="images/thera1.png" alt="" />
//           <h1>Personalized Match</h1>
//           <h3>Discover the right therapist for you, tailored to your mental health needs.</h3>
//         </div>
//         <img className={styles.arrow} src="images/arrow.png" alt="" />
//         <div className={styles.Card3}>
//           <img src="images/start1.png" alt="" />
//           <h1>Start Therapy</h1>
//           <h3>Begin your healing journey with Online Therapy Sessions</h3>
//         </div>
//       </div>
//       <button className={styles.Hero_button}>
//         <Link to="/quiz" className={styles.butn}>
//           Get Started
//         </Link>
//       </button>
//     </div>
//   );
// }

// export default HowItWorks;

import { Link } from 'react-router-dom';
import styles from "./index.module.css"; // Import the CSS module

function HowItWorks() {
  return (
    <div className="How_Works bg-white pt-10 px-4 md:px-16 text-center">
      <div className="How_Text mb-8">
        <h1 className="text-3xl md:text-5xl font-medium text-[#001147] leading-tight text-center mb-5 mt-[5vh] font-sans">
            How Soul Support Works
        </h1>
        
      </div>
      <div className="Cards flex flex-col items-center gap-8 md:flex-row md:justify-around mt-20 mb-10">
        {/* Card 1 */}
        <div className="Card1 flex flex-col items-center  p-6 rounded-lg shadow-md">
          <img className="w-24 h-24 mb-4" src="images/reptile.png" alt="" />
          <h1 className="text-xl font-semibold text-blue-900 mb-2">
            Self-Assessment
          </h1>
          <h3 className="text-sm text-gray-700 text-center">
            Answer a few questions and receive personalized feedback instantly
          </h3>
        </div>

        {/* Arrow 1 */}
        <img
          className="arrow w-6 h-6 md:w-8 md:h-8 rotate-90 md:rotate-0"
          src="images/arrow.png"
          alt="arrow"
        />

        {/* Card 2 */}
        <div className="Card2 flex flex-col items-center p-6 rounded-lg shadow-md">
          <img className="w-24 h-24 mb-4" src="images/thera1.png" alt="" />
          <h1 className="text-xl font-semibold text-blue-900 mb-2">
            Personalized Match
          </h1>
          <h3 className="text-sm text-gray-700 text-center ">
            Discover the right therapist for you, tailored to your mental health needs.
          </h3>
        </div>

        {/* Arrow 2 */}
        <img
          className="arrow w-6 h-6 md:w-8 md:h-8 rotate-90 md:rotate-0"
          src="images/arrow.png"
          alt="arrow"
        />

        {/* Card 3 */}
        <div className="Card3 flex flex-col items-center  p-6 rounded-lg shadow-md">
          <img className="w-24 h-24 mb-4" src="images/start1.png" alt="" />
          <h1 className="text-xl font-semibold text-blue-900 mb-2">
            Start Therapy
          </h1>
          <h3 className="text-sm text-gray-700 text-center">
            Begin your healing journey with Online Therapy Sessions
          </h3>
        </div>
      </div>


      <button className={`${styles.Hero_button} ${styles.mtButton}`}>
         <Link to="/quiz" className="butn">
           Get Started
         </Link>
       </button>

      
    </div>
  );
}

export default HowItWorks;
