
import React, {useEffect, useState} from "react";
import { Link,Navigate, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import Navbar from "../components/Navbar";
import Test from "../components/Test";
// import Cookies from "js-cookie";

const Login = () => {
  const [register,setRegister] = useState(false);
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')
  const navigate = useNavigate()

  const {redirect} = useParams()

  useEffect(()=>{
    // if(Cookies.get("role")){
    //   navigate('/')
    // }
  })
 
  axios.defaults.withCredentials = true;
 
  const handleRegisteration = async ()=>{
    try {
      const response = await axios.post('http://localhost:4000/register', {
        email,
        username,
        password,
      });
      setRegister(false)
    } catch (error) {
      console.error(error);
      alert("error in registeration! Try again")
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('soulUser');
    if (storedUser) {
      const user = JSON.parse(storedUser)
      if(user.role== 'user'){
        navigate(`/`)
      }
      if(user.role== 'pro'){
        navigate("/therapist")
      }
    }
  }, []); 

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/users/login', {
        username,
        password,
      });

      const userData = response.data.data.user

      localStorage.setItem('soulUser', JSON.stringify(userData));


      
          if(userData.role == 'user'){
            alert(redirect)
            navigate(`/${redirect!=undefined?redirect:""}`)
          }
          if(userData.role == 'pro'){
            navigate('/therapist')
          }
          if(response.data.role == 'instructor'){
            navigate('/instructor/session')
          }
      
     
    } catch (error) {
      console.error(error);
      alert("Error !")
    }
  };

    return (
      <>
      {/* <Navbar/> */}
      <Test/>
      {!register ?
      <div className="MainLogin"  >
       <div className="quote">
            <h1 style={{paddingBottom:"1%"}}><q>It is during our darkest moments that we must focus to see the light.</q></h1>
            <p><em>Aristotle Onassis</em></p>
         </div>
        <div className="coverrrr">
            <h1>Login </h1>
            <input className="inputttt" type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <input className="inputttt" type="password" placeholder="password" value={password}
             onChange={(e)=>setPassword(e.target.value)}/>

            <div className="loooginButton" onClick={handleLogin}>Login </div>

            
            <div className="altLogin">
                <p className="textttt">Not Registered?</p>
                <p><Link to='' onClick={()=>setRegister(true)}> Click here to Register!</Link></p>
            </div>
         </div>
      </div>
      :
      <div className="MainLogin">
        <div className="quote">
            <h1 style={{paddingBottom:"1%"}}><q>It is during our darkest moments that we must focus to see the light.</q></h1>
            <p><em>Aristotle Onassis</em></p>
         </div>
        <div className="coverrrr">
            <h1>Register</h1>
            <input className="inputttt" type="email" placeholder="johndoe@yahoo.com" value={email} 
             onChange={(e)=>setEmail(e.target.value)}/>
            <input className="inputttt" type="text" placeholder="username"   value={username}
             onChange={(e)=>setUsername(e.target.value)}/>
            <input className="inputttt" type="password" placeholder="password" value={password} 
             onChange={(e)=>setPassword(e.target.value)}/>

            <div className="loooginButton" onClick={handleRegisteration} >Register</div>


            <div className="altLogin">
              <p className="textttt">Already Registered?</p>
                <p><Link to='' onClick={()=>setRegister(false)}> Click here to Login!</Link></p>
            </div>
         </div>
      </div>
    }

      </>
    )
}

export default Login;