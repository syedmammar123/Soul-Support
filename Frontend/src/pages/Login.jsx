import React, {useEffect, useState} from "react";
import { Link,Navigate, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import Test from "../components/Test";
// import Cookies from "js-cookie";

const Login = () => {
  const [register,setRegister] = useState(false);
  const [fName,setfName] = useState('')
  const [lName,setlName] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [email,setEmail] = useState('')              
  const [gender,setGender] = useState('')              
  const navigate = useNavigate()

  const {redirect} = useParams()
 
  axios.defaults.withCredentials = true;
 
  const handleRegisteration = async ()=>{
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!confirmPassword || !password || !email || !fName || !lName || !gender) {
      alert("Please fill all fields before registering.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/v1/users/register', {
        fName,lName,email,password,gender
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
        email,
        password,
      });

      const userData = response.data.data.user

      localStorage.setItem('soulUser', JSON.stringify(userData));


      
          if(userData.role == 'user'){
            navigate(`/${redirect!=undefined?redirect:""}`)
          }
          if(userData.role == 'pro'){
            navigate(`/${redirect!=undefined?redirect:"therapist"}`)

            // navigate('/therapist')
          }
          if(response.data.role == 'instructor'){
            navigate('/instructor/session')
          }
      
     
    } catch (error) {
      console.error(error);
      alert("Error in login!")
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
            <h1 className="text-lg mt-2 mb-1 font-bold">Login </h1>
            <input className="border border-none bg-gray-50 w-[80%] rounded-md text-center p-3 text-base" type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input className="border border-none bg-gray-50 w-[80%] text-center p-3 text-base rounded-md" type="password" placeholder="Password" value={password}
             onChange={(e)=>setPassword(e.target.value)}/>

            <div className="loooginButton" onClick={handleLogin}>Login </div>

           

            
            <div className="altLogin mt-1 mb-1">
                <p className="text-sm">Not Registered?</p>
                <p><Link to='' className="italic underline text-blue-600" onClick={()=>setRegister(true)}> Click here to Register!</Link></p>
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
            <h1 className="text-lg mt-2 mb-1 font-bold">Register</h1>
            <div className="flex item justify-between w-[80%]">
            <input className="border border-none bg-50 w-[45%] rounded-sm text-center p-2 text-sm" type="text" placeholder="First Name"  value={fName}
             onChange={(e)=>setfName(e.target.value)}/>
            <input className="border border-none bg-gray-50 w-[45%] rounded-sm text-center p-2 text-sm" type="text" placeholder="Last Name"  value={lName}
             onChange={(e)=>setlName(e.target.value)}/>

            </div>

              
            <input className="border border-none bg-gray-50 w-[80%] rounded-sm text-center p-2 text-sm" type="email" placeholder="johndoe@yahoo.com" value={email} 
             onChange={(e)=>setEmail(e.target.value)}/>
            <select name="gender" id="gender" className="border border-none bg-gray-50 w-[80%] rounded-sm text-center p-2 text-sm" value={gender}
            onChange={(e)=>setGender(e.target.value)}
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
           
            <input className="border border-none bg-gray-50 w-[80%] rounded-sm text-center p-2 text-sm" type="password" placeholder="Password" value={password} 
            onChange={(e)=>setPassword(e.target.value)}/>

            <input className="border border-none bg-gray-50 w-[80%] rounded-sm text-center p-2 text-sm" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />


            <div className="loooginButton " onClick={handleRegisteration} >Register</div>

            <div className="altLogin mt-1 mb-1">
              <p className="text-sm">Already Registered?
                  <Link to='' className="italic underline text-blue-600" onClick={()=>setRegister(false)}> Click here to Login!</Link>
              </p>
            </div>
         </div>
      </div>
    }

      </>
    )
}

export default Login;