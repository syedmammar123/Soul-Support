// import React, { useEffect, useState } from 'react'
// import '../App.css'
// import { Link } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBars, faX } from '@fortawesome/free-solid-svg-icons'

// const Test = () => {
//     const [showMediaIcons, setShowMediaIcons] = useState(false);

//     return (
//     <>
//         <nav className='main-nav'>
//             <div className='loga'>
//                 <img src="images/NavLogo.png" className='w-36' alt="" />
//             </div>

//             <div className={showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"}>
//                 <ul>
//                     <li className=' bg-green-200 rounded-full w-20 py-1 text-center'>
//                         <Link >Home</Link>
//                     </li>
//                     <li className=' bg-green-200 rounded-full w-20 py-1 text-center'>
//                         <Link  >AI-Chat</Link>
//                     </li>
//                     <li className=' bg-green-200 rounded-full w-20 py-1 text-center'>
//                         <Link>Quiz</Link>
//                     </li>
//                     <li className=' bg-green-200 rounded-full w-20 py-1 text-center'>
//                         <Link >Blogs</Link>
//                     </li>
//                     <li className=' bg-green-200 rounded-full w-20 py-1 text-center'>
//                         <Link>Careers</Link>
//                     </li>
//                     <li className=' bg-green-200 rounded-full w-20 py-1 text-center'>
//                         <Link >Sessions</Link>
//                     </li>


//                     <li >
//                 <button className='bg-green-500 rounded-full w-40 text-center text-lg hover:text-xl font-semibold font-mono text-white ' style={{display:showMediaIcons?"inline-block":"none"}}>Therapy</button>
//                     </li>
//                     <li>
//                 <button className='bg-green-500  rounded-full w-40 text-center text-lg hover:text-xl font-semibold font-mono text-white  ' style={{display:showMediaIcons?"inline-block":"none"}}>Sign Up</button>
//                     </li>
//                 </ul>
//             </div>

//             <div className='btn3rd'>
//                 <button className='btnDesktop bg-green-500 rounded-full w-24 py-1 text-lg hover:text-xl font-semibold font-mono text-white mr-2'>Therapy</button>
//                 <button className='btnDesktop bg-green-500 rounded-full w-24 py-1 text-lg hover:text-xl font-semibold font-mono text-white'>Sign-Up</button>


//                 <div className="hamburger-menu">
//                 <Link href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
//                     <FontAwesomeIcon icon={faBars} />
//                 </Link>
//                 </div>
//             </div>

            
//         </nav>

  
//     </>
//     )
// }

// export default Test;


import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import axios from 'axios';

const Test = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [user,setUser] = useState()
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;


  const handleClick = async (e)=>{
    const buttonName = e.innerText
    
    if(buttonName==="Logout"){
      localStorage.removeItem('soulUser')
        navigate("/")
        setUser()
        await axios.post('http://localhost:3000/api/v1/users/logout');
        

    }else if(buttonName==="Sign Up"){
      navigate("/login")
      console.log("logout");
    }else{
      console.log("else");
    }  
  }

  useEffect(() => {
  const storedUser = localStorage.getItem('soulUser');
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
  }, []); 

  const commonLiClass = 'bg-green-200 rounded-full w-20 py-1 text-center';
  const commonButtonClass = 'bg-green-500 rounded-full  text-center text-lg hover:text-xl font-semibold font-mono text-white';


  const renderTherapyAndSignUpButtons = () => {
    if (showMediaIcons) {
      return (
        <>
          <li>
            <button className={`${commonButtonClass} w-40`}>Therapy</button>
          </li>
          <li>{
            user?
            <button className={`${commonButtonClass} w-40`} onClick={(e)=>handleClick(e.target)}>Logout</button>
            :
            <button className={`${commonButtonClass} w-40`} onClick={(e)=>handleClick(e.target)}>Sign Up</button>
            }
            
          </li>
        </>
      );
    }
    return null;
  };

  return (
    <>
      <nav className='main-nav'>
        <header className='logo'>
          <img src="images/NavLogo.png" className='w-36' alt="" />
        </header>

        <div className={showMediaIcons ? 'menu-link mobile-menu-link' : 'menu-link'}>
          <ul>
            {['Home', 'AI-Chat', 'Quiz', 'Blogs', 'Careers', 'Sessions'].map((item, index) => (
              <li key={index} className={commonLiClass}>
                <Link to={`/${item.toLowerCase()}`}>{item}</Link>
              </li>
            ))}
            {renderTherapyAndSignUpButtons()}
          </ul>
        </div>

        <div className='nav-CTA'>
          <button className={`${commonButtonClass} w-24 hideNavBtns mr-2 `}>Therapy</button>
          <button className={`${commonButtonClass} w-24 hideNavBtns`}>Sign-Up</button>

          <div className="hamburger-menu">
            <Link href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <FontAwesomeIcon icon={faBars} />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Test;

