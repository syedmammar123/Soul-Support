import React, { useEffect, useState, } from 'react';
import { Link,Navigate, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCircleInfo, faBriefcase, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
// import Cookies from 'js-cookie';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()

//   const username=Cookies.get("username")
//   const role=Cookies.get("role")

// useEffect(()=>{
//   if(Cookies.get("role")){
//     setIsLoggedIn(true)
//   }
// },[])


  
//    const logout =  () => {
//     try {
//       // const response = await axios.post('http://localhost:4000/logout');
  
//       // if (response.status === 200) {
//         Cookies.remove("username");
//         Cookies.remove("role");
//         setIsLoggedIn(false);
//         navigate('/');

//     } catch (error) {
//       console.error(error);
//     }
//   };

  const signup = ()=>{
    navigate('/login')
  }
  

  return (
    <nav className="navbar">
      <div className="logo" >
        <Link to="#">
          <img id="soul" src="images/NavLogo.png" alt=""   />
        </Link>
      </div>

      <ul className="navitem">
        {/* {(role=='user' || role==null) ? */}
        <>
        <li>
          <Link className="navlinks" to="/">
            <FontAwesomeIcon icon={faHouse} />Home
          </Link>
        </li>
        <li>
          <Link className="navlinks" to="/chat">
            <FontAwesomeIcon icon={faHouse} />Chats
          </Link>
        </li>
        <li>
          <Link className="navlinks" to="/careers">
            <FontAwesomeIcon icon={faCircleInfo} />Careers
          </Link>
        </li>
        <li>
          <Link className="navlinks" to="/blogs">
            <FontAwesomeIcon icon={faHouse} />Blogs
          </Link>
        </li>
        <li>
          <Link className="navlinks" to="/quiz">
            <FontAwesomeIcon icon={faCircleInfo} />Quiz
          </Link>
        </li>
        <li>
         
        </li>
        <li>
          <Link className="navlinks" to="/therapy">
            <FontAwesomeIcon icon={faAddressBook} />Therapy
          </Link>
        </li>
        </> 
        {/* :null} */}
        {/* {!isLoggedIn ?( */}
          <button className="signup signup2`" onClick={signup}>Sign up</button>
      {/* //   ):
      //   (<button className={`${stylea.signup} ${stylea.signup2}`} onClick={logout}>Logout</button>
      //   )
      // } */}
      </ul>
    </nav>
  );
}

export default Navbar;
