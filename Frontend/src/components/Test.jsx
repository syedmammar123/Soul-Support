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
        await axios.post('http://localhost:4000/api/v1/users/logout');
        

    }else if(buttonName==="Log In"){
      navigate("/login")
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
            <button className={`${commonButtonClass} w-40`} onClick={(e)=>handleClick(e.target)}>Log In</button>
            }
            
          </li>
        </>
      );
    }
    return null;
  };

  return (
    <>
      <nav className='main-nav z-10'>
        <header className='logo'>
          <img src="images/NavLogo.png" className='w-36 cursor-pointer' alt="" 
          onClick={()=>navigate("/")}
          />
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
          {user?
          <button className={`${commonButtonClass} w-24 hideNavBtns`} onClick={(e)=>handleClick(e.target)}>Logout</button>
          :
          <button className={`${commonButtonClass} w-24 hideNavBtns`} onClick={(e)=>handleClick(e.target)}>Log In</button>
          }

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

