// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';

// const expertiseOptions = ['Depression', 'Anxiety', 'PTSD', 'OCD', 'Stress'];
// const validTimings = [
//   'Mon-Wed-Fri: 11am-4pm',
//   'Tue-Thu-Sat: 4pm-9pm',
//   'Sunday: 10am-8pm',
// ];
// const experienceOptions = [0, 1, 2, 3, 4, 5, '10+'];
// const genderOptions = ['Male', 'Female'];
// const specializationOptions = [
//   'Cognitive Behavioral Therapy (CBT)',
//   'Family Therapy',
//   'Marriage and Couples Therapy',
//   'Child and Adolescent Therapy',
//   'Trauma Therapy'
// ];

// const ProfessionalRegistration = () => {
//   const [step, setStep] = useState(1);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [fName, setFName] = useState('');
//   const [lName, setLName] = useState('');
//   const [expertise, setExpertise] = useState('');
//   const [licenseNo, setLicenseNo] = useState('');
//   const [timings, setTimings] = useState('');
//   const [specialization, setSpecialization] = useState('');
//   const [experience, setExperience] = useState('');
//   const [feePerSession, setFeePerSession] = useState('');
//   const [gender, setGender] = useState('');
//   const [profilePic, setProfilePic] = useState(null);
//   const [cv, setCv] = useState(null);
//   const navigate = useNavigate();

//   const handleRegistration = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('username', username);
//       formData.append('password', password);
//       formData.append('email', email);
//       formData.append('fName', fName);
//       formData.append('lName', lName);
//       formData.append('expertise', expertise);
//       formData.append('licenseNo', licenseNo);
//       formData.append('timings', timings);
//       formData.append('specialization', specialization);
//       formData.append('experience', experience);
//       formData.append('feePerSession', feePerSession);
//       formData.append('gender', gender);
//       formData.append('profilePic', profilePic);
//       formData.append('cv', cv);

//       await axios.post('http://localhost:4000/applyProfessional', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
      
//       alert("Professional registered successfully!");
//       navigate('/'); // Redirect to homepage or appropriate route after registration
//     } catch (error) {
//       console.error(error);
//       alert("Error in registration. Please try again.");
//     }
//   };

//   const handleProfilePicChange = (e) => {
//     setProfilePic(e.target.files[0]);
//   };

//   const handleCvChange = (e) => {
//     setCv(e.target.files[0]);
//   };

//   const nextStep = () => {
//     setStep(step + 1);
//   };

//   const prevStep = () => {
//     setStep(step - 1);
//   };

//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return (
//           <CSSTransition key="step1" timeout={300} classNames="fade">
//             <div>
//               <h1 className="text-2xl font-bold mb-4">Register as Professional</h1>
//               <input className="mb-2 p-2 border border-gray-300 rounded w-full" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//               <input className="mb-2 p-2 border border-gray-300 rounded w-full" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
//               <input className="mb-4 p-2 border border-gray-300 rounded w-full" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//               <button className="bg-blue-500 text-white p-2 rounded" onClick={nextStep}>Next</button>
//             </div>
//           </CSSTransition>
//         );
//       case 2:
//         return (
//           <CSSTransition key="step2" timeout={300} classNames="fade">
//             <div>
//               <h1 className="text-2xl font-bold mb-4">Register as Professional</h1>
//               <input className="mb-2 p-2 border border-gray-300 rounded w-full" type="text" placeholder="First Name" value={fName} onChange={(e) => setFName(e.target.value)} />
//               <input className="mb-2 p-2 border border-gray-300 rounded w-full" type="text" placeholder="Last Name" value={lName} onChange={(e) => setLName(e.target.value)} />
//               <select className="mb-2 p-2 border border-gray-300 rounded w-full" value={expertise} onChange={(e) => setExpertise(e.target.value)}>
//                 <option value="">Select Expertise</option>
//                 {expertiseOptions.map((opt, index) => (
//                   <option key={index} value={opt}>{opt}</option>
//                 ))}
//               </select>
//               <input className="mb-4 p-2 border border-gray-300 rounded w-full" type="text" placeholder="License No." value={licenseNo} onChange={(e) => setLicenseNo(e.target.value)} />
//               <div className="flex justify-between">
//                 <button className="bg-gray-500 text-white p-2 rounded" onClick={prevStep}>Back</button>
//                 <button className="bg-blue-500 text-white p-2 rounded" onClick={nextStep}>Next</button>
//               </div>
//             </div>
//           </CSSTransition>
//         );
//       case 3:
//         return (
//           <CSSTransition key="step3" timeout={300} classNames="fade">
//             <div>
//               <h1 className="text-2xl font-bold mb-4">Register as Professional</h1>
//               <select className="mb-2 p-2 border border-gray-300 rounded w-full" value={timings} onChange={(e) => setTimings(e.target.value)}>
//                 <option value="">Select Timings</option>
//                 {validTimings.map((opt, index) => (
//                   <option key={index} value={opt}>{opt}</option>
//                 ))}
//               </select>
//               <select className="mb-2 p-2 border border-gray-300 rounded w-full" value={specialization} onChange={(e) => setSpecialization(e.target.value)}>
//                 <option value="">Select Specialization</option>
//                 {specializationOptions.map((opt, index) => (
//                   <option key={index} value={opt}>{opt}</option>
//                 ))}
//               </select>
//               <select className="mb-2 p-2 border border-gray-300 rounded w-full" value={experience} onChange={(e) => setExperience(e.target.value)}>
//                 <option value="">Select Experience</option>
//                 {experienceOptions.map((opt, index) => (
//                   <option key={index} value={opt}>{opt}</option>
//                 ))}
//               </select>
//               <input className="mb-4 p-2 border border-gray-300 rounded w-full" type="text" placeholder="Fee Per Session" value={feePerSession} onChange={(e) => setFeePerSession(e.target.value)} />
//               <div className="flex justify-between">
//                 <button className="bg-gray-500 text-white p-2 rounded" onClick={prevStep}>Back</button>
//                 <button className="bg-blue-500 text-white p-2 rounded" onClick={nextStep}>Next</button>
//               </div>
//             </div>
//           </CSSTransition>
//         );
//       case 4:
//         return (
//           <CSSTransition key="step4" timeout={300} classNames="fade">
//             <div>
//               <h1 className="text-2xl font-bold mb-4">Register as Professional</h1>
//               <select className="mb-2 p-2 border border-gray-300 rounded w-full" value={gender} onChange={(e) => setGender(e.target.value)}>
//                 <option value="">Select Gender</option>
//                 {genderOptions.map((opt, index) => (
//                   <option key={index} value={opt}>{opt}</option>
//                 ))}
//               </select>
//               <input className="mb-2 p-2 border border-gray-300 rounded w-full" type="file" onChange={handleProfilePicChange} />
//               <input className="mb-4 p-2 border border-gray-300 rounded w-full" type="file" onChange={handleCvChange} />
//               <div className="flex justify-between">
//                 <button className="bg-gray-500 text-white p-2 rounded" onClick={prevStep}>Back</button>
//                 <button className="bg-green-500 text-white p-2 rounded" onClick={handleRegistration}>Register</button>
//               </div>
//             </div>
//           </CSSTransition>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
//         <TransitionGroup>
//           {renderStep()}
//         </TransitionGroup>
//         <style>{`
//           .fade-enter {
//             opacity: 0;
//             transform: scale(0.9);
//           }
//           .fade-enter-active {
//             opacity: 1;
//             transform: scale(1);
//             transition: opacity 300ms, transform 300ms;
//           }
//           .fade-exit {
//             opacity: 1;
//           }
//           .fade-exit-active {
//             opacity: 0;
//             transition: opacity 300ms;
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// };

// export default ProfessionalRegistration;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const validTimings = [
  'Mon-Wed-Fri: 11am-4pm',
  'Tue-Thu-Sat: 4pm-9pm',
  'Sunday: 10am-8pm',
];
const experienceOptions = [0, 1, 2, 3, 4, 5, '10+'];
const genderOptions = ['Male', 'Female'];
const specializationOptions = [
  'Cognitive Behavioral Therapy (CBT)',
  'Family Therapy',
  'Marriage and Couples Therapy',
  'Child and Adolescent Therapy',
  'Trauma Therapy'
];

const ProfessionalRegistration = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [licenseNo, setLicenseNo] = useState('');
  const [timings, setTimings] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [feePerSession, setFeePerSession] = useState('');
  const [gender, setGender] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [cv, setCv] = useState(null);
  const navigate = useNavigate();

  const handleRegistration = async () => {
    if (!username || !password || !email || !fName || !lName || !licenseNo || !timings || !specialization || !experience || !feePerSession || !gender || !profilePic || !cv) {
      alert("Please fill all fields before registering.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('email', email);
      formData.append('fName', fName);
      formData.append('lName', lName);
      formData.append('licenseNo', licenseNo);
      formData.append('timings', timings);
      formData.append('specialization', specialization);
      formData.append('experience', experience);
      formData.append('feePerSession', feePerSession);
      formData.append('gender', gender);
      formData.append('profilePic', profilePic);
      formData.append('cv', cv);

      await axios.post('http://localhost:4000/applyProfessional', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      alert("Professional registered successfully!");
      navigate('/'); // Redirect to homepage or appropriate route after registration
    } catch (error) {
      console.error(error);
      alert("Error in registration. Please try again.");
    }
  };

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleCvChange = (e) => {
    setCv(e.target.files[0]);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <CSSTransition key="step1" timeout={300} classNames="slide">
            <div>
              <h1 className="text-2xl font-bold mb-4">Register as Professional</h1>
              <input className="mb-2 p-2 border border-gray-300 rounded w-full" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className="mb-2 p-2 border border-gray-300 rounded w-full" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <input className="mb-4 p-2 border border-gray-300 rounded w-full" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button className="bg-blue-500 text-white p-2 rounded" onClick={nextStep}>Next</button>
            </div>
          </CSSTransition>
        );
      case 2:
        return (
          <CSSTransition key="step2" timeout={300} classNames="slide">
            <div>
              <h1 className="text-2xl font-bold mb-4">Register as Professional</h1>
              <input className="mb-2 p-2 border border-gray-300 rounded w-full" type="text" placeholder="First Name" value={fName} onChange={(e) => setFName(e.target.value)} />
              <input className="mb-2 p-2 border border-gray-300 rounded w-full" type="text" placeholder="Last Name" value={lName} onChange={(e) => setLName(e.target.value)} />
              <input className="mb-4 p-2 border border-gray-300 rounded w-full" type="text" placeholder="License No." value={licenseNo} onChange={(e) => setLicenseNo(e.target.value)} />
              <div className="flex justify-between">
                <button className="bg-gray-500 text-white p-2 rounded" onClick={prevStep}>Back</button>
                <button className="bg-blue-500 text-white p-2 rounded" onClick={nextStep}>Next</button>
              </div>
            </div>
          </CSSTransition>
        );
      case 3:
        return (
          <CSSTransition key="step3" timeout={300} classNames="slide">
            <div>
              <h1 className="text-2xl font-bold mb-4">Register as Professional</h1>
              <select className="mb-2 p-2 border border-gray-300 rounded w-full" value={timings} onChange={(e) => setTimings(e.target.value)}>
                <option value="">Select Timings</option>
                {validTimings.map((opt, index) => (
                  <option key={index} value={opt}>{opt}</option>
                ))}
              </select>
              <select className="mb-2 p-2 border border-gray-300 rounded w-full" value={specialization} onChange={(e) => setSpecialization(e.target.value)}>
                <option value="">Select Specialization</option>
                {specializationOptions.map((opt, index) => (
                  <option key={index} value={opt}>{opt}</option>
                ))}
              </select>
              <select className="mb-2 p-2 border border-gray-300 rounded w-full" value={experience} onChange={(e) => setExperience(e.target.value)}>
                <option value="">Select Experience</option>
                {experienceOptions.map((opt, index) => (
                  <option key={index} value={opt}>{opt}</option>
                ))}
              </select>
              <input className="mb-4 p-2 border border-gray-300 rounded w-full" type="text" placeholder="Fee Per Session" value={feePerSession} onChange={(e) => setFeePerSession(e.target.value)} />
              <div className="flex justify-between">
                <button className="bg-gray-500 text-white p-2 rounded" onClick={prevStep}>Back</button>
                <button className="bg-blue-500 text-white p-2 rounded" onClick={nextStep}>Next</button>
              </div>
            </div>
          </CSSTransition>
        );
      case 4:
        return (
          <CSSTransition key="step4" timeout={300} classNames="slide">
            <div>
              <h1 className="text-2xl font-bold mb-4">Register as Professional</h1>
              <select className="mb-2 p-2 border border-gray-300 rounded w-full" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                {genderOptions.map((opt, index) => (
                  <option key={index} value={opt}>{opt}</option>
                ))}
              </select>
              <input className="mb-2 p-2 border border-gray-300 rounded w-full" type="file" onChange={handleProfilePicChange} />
              <input className="mb-4 p-2 border border-gray-300 rounded w-full" type="file" onChange={handleCvChange} />
              <div className="flex justify-between">
                <button className="bg-gray-500 text-white p-2 rounded" onClick={prevStep}>Back</button>
                <button className="bg-green-500 text-white p-2 rounded" onClick={handleRegistration}>Register</button>
              </div>
            </div>
          </CSSTransition>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <TransitionGroup>
          {renderStep()}
        </TransitionGroup>
        <style>{`
          .slide-enter {
            opacity: 0;
            transform: translateX(100%);
          }
          .slide-enter-active {
            opacity: 1;
            transform: translateX(0);
            transition: opacity 300ms, transform 300ms;
          }
          .slide-exit {
            opacity: 1;
          }
          .slide-exit-active {
            opacity: 0;
            transform: translateX(-100%);
            transition: opacity 300ms, transform 300ms;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ProfessionalRegistration;
