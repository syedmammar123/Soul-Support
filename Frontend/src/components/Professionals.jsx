import  { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from './Card';
import JoinCall from './JoinCall';

const Professionals = () => {
  const navigate = useNavigate()
    const currentDate = new Date();

 

 
  const [appointments , setAppointments] = useState([
    {
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() ,6), // Replace this with your appointment date in the same format
      details: 'Regular Checkup',
    },
    {
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 3), // Replace this with your appointment date in the same format
      details: 'Follow-up Session',
    }
  ]);
  const [blogs , setBlogs] = useState([{ id: 1, title: 'Blog 1', content: 'This is the content of Blog 1.', pic: 'login-bg' },
    { id: 2, title: 'Blog 2', content: 'This is the content of Blog 2.', pic: 'image' },
    { id: 3, title: 'Blog 3', content: 'This is the content of Blog 3.', pic: 'login-bg' },]);
  const fetchData = async () => {
    // try {
    //   const res = await axios.get('http://localhost:4000/therapist');
    //   setAppointments(res.data);
    //   console.log(res.data);
    // } catch (err) {
    //   console.log(err);
    // }
  }
 
  const fetchData2 = async () => {
    // try {
    //   const res = await axios.get('http://localhost:4000/therapist');
    //   setBlogs(res.data);
    //   console.log(res.data);
    // } catch (err) {
    //   console.log(err);
    // }
  }

useEffect(()=>{
    fetchData()
    },[]);
    
  useEffect(()=>{
    fetchData2()
    },[]);

  
 
  const upcomingAppointments = appointments.filter(
    (appointment) => appointment.date > currentDate
  );

  return (
    <>
    <section id="head" className="head_aq">
      <div className="container_aq">
        {/* Left Container */}


        {/* Right Container */}
        <div className="right-container_aq">
          <div className="right-container-head_aq"><center><h2 >APPOINTMENTS</h2></center></div>
          <> 
          {/* this is just a sample you have to implement conditional rendering! */}
            <p>You have a Session Today .</p>
            Time, join button
            Time, join button
            {/* <JoinCall /> */}
            </>
            <h5>Upcomming Appointment</h5>
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appoint) => (
              <div key={appoint}>
                {appoint.date.getDate() === currentDate.getDate() &&
                appoint.date.getMonth() === currentDate.getMonth() &&
                appoint.date.getFullYear() === currentDate.getFullYear() ? (
                  <div className='appoint-card_aqsa' >
                    <h3 className="appoint-card-head_aq">Todays Appointment</h3>
                   
                    <p className='appoint-card-p_aq'>Date: {appoint.date.toLocaleDateString()}</p>
                    <p className='appoint-card-p_aq'>Time: {appoint.date.toLocaleTimeString()}</p>
                    <p className='appoint-card-p_aq'>Details: {appoint.details}</p>
                    {<button className='appoint-card-btn_aq' >Join Session</button>}
                  </div>
                ) : 
                  
                  ( <div className="appoint-card_aqsa">
                    <h3 className="appoint-card-head_aq">Upcoming Appointment</h3>
                    <p className="appoint-card-p_aq">Date: {appoint.date.toLocaleDateString()}</p>
                  <p className="appoint-card-p_aq">Details: {appoint.details}</p>
                  
                  </div>
                )}
              </div>
            ))
          ) : (
           <> 
            <p>You have a Session Today .</p>
            <JoinCall />
            </>
          )}
        </div>

        Your Sessions:
        You currently donot have any upcomming session.
        card of session with topic date and join button
        
      </div>
    </section>
    </>
  );
};

export default Professionals;
