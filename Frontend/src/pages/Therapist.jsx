// import React, { useEffect, useState } from 'react';
// import Test from '../components/Test';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Therapist = () => {
//   const navigate = useNavigate()
  
//   axios.defaults.withCredentials = true;

//   const fetchUserDetail = async () => {
//   try {
//     const response = await axios.get('http://localhost:4000/api/v1/users/getUser');
    
//     const data = response.data.message; 

//     if(data.role != "pro"){
//       navigate("/")
//     }


//     // setUserName(data.fName + " " +data.lName)

//   } catch (error) {
    
//     if(error.response && error.response.status === 404 && error.response.data.message==="No user found!"){
//       alert("seems like issue in user id :(")
//       navigate("/")
//     }

//     if (error.response && error.response.status === 401) {
//     try {
//       // Send a request to the refresh-token route
//       await axios.post('http://localhost:4000/api/v1/users/refresh-token');
      
//       // Retry the original request after token refresh
//       await fetchUserDetail();
//     } catch (refreshError) {
//       console.error('Error refreshing token:', refreshError);
//       navigate(`/login/therapist`)
//       // Handle the error when refresh token fails
//     }
//   } else {
//     // Handle other types of errors
//     console.error('Error occurred:', error);
//   }     
//   }
//   };

//   const fetchSessions = async () => {
//   try {
//     const response = await axios.get('http://localhost:4000/api/v1/session/one');
    
//     const data = response.data.message; 

//     let formattedData = [ ] 
//     for (let i = 0; i < data.length; i++) {
//       const obj = {};
//       obj._id = data[i]._id      
//       obj.topic = data[i].title      
//       const idx = data[i].dateTime.indexOf("T")
//       obj.date =  data[i].dateTime.slice(0,idx)

//       const date = new Date(data[i].dateTime)
      
      
//       obj.startTime = `${date.getHours()}:${date.getMinutes()}`
//       date.setHours(date.getHours()+1)
//       obj.endTime = `${date.getHours()}:${date.getMinutes()}`
//       obj.dateTime = data[i].dateTime

//       formattedData.push(obj)
//     }

//     setUpcomingSessions(formattedData)



//   } catch (error) {
    
//     if(error.response && error.response.status === 404 && error.response.data.message==="No Session Found!!"){
      
//       //no sessions for the therapist
//     }

    
//   }
//   };

//   useEffect(()=>{
//         fetchUserDetail();
//         fetchSessions()
//   },[])



//   const currentDate = new Date();

//   const [upcomingAppointments, setUpcomingAppointments] = useState([
//     { date: '2024-06-07', startTime: '17:00', endTime: '20:00', client: 'John Doe', issue: 'Depression' },
//     { date: '2024-06-07', startTime: '18:00', endTime: '18:50', client: 'Jane Smith', issue: 'Anxiety' },
//     { date: '2024-06-09', startTime: '12:00', endTime: '13:00', client: 'Emily Johnson', issue: 'PTSD' },
//     { date: '2024-06-10', startTime: '09:00', endTime: '10:00', client: 'Michael Brown', issue: 'OCD' },
//     { date: '2024-06-11', startTime: '14:00', endTime: '15:00', client: 'Sarah Davis', issue: 'Stress' },
//   ]);


//   const [upcomingSessions, setUpcomingSessions] = useState([]);

//   const isAppointmentTimeNow = (date, startTime, endTime) => {
//     const startDateTime = new Date(date + 'T' + startTime);
//     const endDateTime = new Date(date + 'T' + endTime);

//     return currentDate >= startDateTime && currentDate <= endDateTime;
//   };

//   const isSameDayAppointment = (date) => {
//     const appointmentDate = new Date(date);
//     const appointmentDateString = appointmentDate.toDateString();
//     const currentDateDateString = currentDate.toDateString();
//     return appointmentDateString === currentDateDateString;
//   };

//   const isPastAppointment = (date, endTime) => {
//     const endDateTime = new Date(date + 'T' + endTime);
//     return currentDate > endDateTime;
//   };

//   const previousBlogs = [
//     { id:1,  topic: 'Life of Pie!', date: '20th May 2024' },
//     { id:2,  topic: 'Life of Pie2!', date: '20th May 2024' },
//     { id:3,  topic: 'Life of Pie3!', date: '20th May 2024' },
//     { id:3,  topic: 'Life of Pie3!', date: '20th May 2024' },
//     { id:3,  topic: 'Life of Pie3!', date: '20th May 2024' },
//     { id:3,  topic: 'Life of Pie3!', date: '20th May 2024' },
//     { id:3,  topic: 'Life of Pie3!', date: '20th May 2024' },
//   ];

//   const isSessionNow = (time) => {
//     const sessionStartTime = new Date(time);
//     const now = new Date();
//     const sessionEndTime = new Date(sessionStartTime.getTime() + (60 * 60 * 1000)); 

//     if (now >= sessionStartTime && now <= sessionEndTime) {
//         return 'live';
//     }

//     if (now > sessionEndTime) {
//         return 'expired';
//     }

//     return 'upcoming';
//   };

//   const handleJoin = (id)=>{
//      window.location.href = `/therapist/session/${id}`
//     }


//   return (
//     <div className="min-h-screen bg-green-50">
//       <Test />
//       <div className="p-5">
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="flex-1 md:flex-none md:w-1/3 bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-2xl font-semibold text-green-700 text-center">Blogs</h2>
//             <p className='text-center text-sm italic my-3 font-semibold font-mono'>
//               SHARE YOUR VOICE: 
//               <button className="font-semibold font-mono border-solid border-2 rounded-xl px-3 ml-3 bg-[#baffae] text-green-700">Write for Us!</button>
//             </p>

//             <h2 className="text-base font-semibold text-green-700 mt-1 italic">Your Blogs:</h2>
            
//             <div className="mt-0 max-h-80 overflow-y-auto">
      
//               {previousBlogs.length>0
//               ?
              
//               previousBlogs.map((blog, index) => (
//                 <div key={index} className="mb-4 p-2 bg-green-50 rounded-lg mr-1 cursor-pointer">
                  
//                   <p className="text-lg font-semibold italic text-green-900 flex justify-between items-center">{blog.topic}
//                     <div>
//                      <button className='mt-1 px-3 py-0 mb-0 mr-2  rounded-xl text-xs bg-sky-400 text-white border border-green-600 font-normal'>Edit</button>
//                   <button className='mt-1 px-2 py-0 mb-1 rounded-xl text-xs bg-red-400 text-white border border-green-600'>Delete</button>
//                   </div>
//                   </p>
//                   <p className="text-gray-500 text-xs italic flex justify-between items-center">{blog.date} </p>
//                 </div>
//               ))
//             :
//               <p className="text-gray-600">You currently do not have any history of booked sessions!</p>}
              
//             </div>
//           </div>
          
//           <div className="flex-1 bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">Appointments</h2>
//             <div className="mb-4">
//               <h2 className="text-base font-semibold text-green-700 mt-6 italic">Upcoming Appointments:</h2>
//               <div className="mt-2 max-h-80 overflow-y-auto">
//                 {upcomingAppointments.map((appointment, index) => (
//                   <div key={index} className="mb-4 px-2 py-1 mr-1 rounded-lg  bg-green-50 " >
//                     <p className="text-lg font-semibold text-green-900 italic">{appointment.client}</p>
//                     <p className="text-gray-500 text-xs italic">{appointment.date} | {appointment.startTime} - {appointment.endTime}</p>
//                     <p className="text-gray-500 text-sm italic flex items-center justify-between ">{appointment.issue}                  {isAppointmentTimeNow(appointment.date, appointment.startTime, appointment.endTime) && (
//                       // <button className="mt-0 px-2 py-1 mb-1 rounded-xl text-xs bg-green-400 text-white border border-green-500">
//                       //   Join Now!
//                       // </button>
//                     <button className="mt-0 px-2 py-1 mb-1 rounded-xl text-xs bg-green-400 text-white border border-green-500 glow-multiple">
//                       Join Now!
//                     </button>


//                     )}
//                     {!isAppointmentTimeNow(appointment.date, appointment.startTime, appointment.endTime) && !isPastAppointment(appointment.date, appointment.endTime) && isSameDayAppointment(appointment.date) && (
//                       <button className="mt-1 px-2 py-1 rounded-xl text-xs bg-gray-300 text-gray-500" disabled>
//                         Appointment Today
//                       </button>
//                     )}
//                     </p>

//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
          
//           <div className="flex-1 bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">Sessions</h2>
//             <div className="mb-4">
//               <h2 className="text-base font-semibold text-green-700 mt-6 italic">Upcoming Sessions:</h2>
              
//               <div className="mt-2 max-h-80 overflow-y-auto">
//                 {upcomingSessions.map((session, index) => (
//                   <div key={index} className="mb-4 px-2 py-1 rounded-lg  bg-green-50 mr-1">
//                     <p className="text-lg font-semibold text-green-900 italic">{session.topic}</p>
//                     <p className="text-gray-500 text-xs italic">{session.date}</p>
//                     <p className= "text-gray-500 text-xs italic flex items-center justify-between"> {session.startTime} - {session.endTime} 

//                     {isSessionNow(session.dateTime) === 'live' 
//                     && 
//                     (
//                       <p className="mb-1 px-2 py-1 rounded-xl text-xs bg-green-400 text-white border border-green-500 glow-multiple cursor-pointer font-medium"
//                       onClick={()=>handleJoin(session._id)}>
//                         Join Now!
//                       </p>
//                     )}

//                     {isSessionNow(session.dateTime) === 'upcoming' && (
//                       <p className="mt-1 px-2 py-1 rounded-xl text-xs bg-gray-300  cursor-default text-white" disabled>
//                         Comming Soon
//                       </p>
//                     )}

//                     {isSessionNow(session.dateTime) === 'expired' && (
//                       <p className="mt-1 px-2 py-1 rounded-xl text-xs bg-red-300 text-white" disabled>
//                         Session Expired
//                       </p>
//                     )}
//                     </p>

//                   </div>
//                 ))}
//               </div>
//               <p className='text-xs font-sans italic underline text-green-600 cursor-pointer mt-2' onClick={()=>navigate("/sessions")}>Browse sessions as viewer!</p>
//             </div>
//           </div>
//         </div>

//         {/* <JoinCall /> */}
//       </div>
//     </div>
//   );
// };

// export default Therapist;
import React, { useEffect, useState } from 'react';
import Test from '../components/Test';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Therapist = () => {
  const navigate = useNavigate();
  
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [upcomingAppointments, setUpcomingAppointments] = useState([
    { date: '2024-06-07', startTime: '17:00', endTime: '20:00', client: 'John Doe', issue: 'Depression' },
    { date: '2024-06-07', startTime: '18:00', endTime: '18:50', client: 'Jane Smith', issue: 'Anxiety' },
    { date: '2024-06-09', startTime: '12:00', endTime: '13:00', client: 'Emily Johnson', issue: 'PTSD' },
    { date: '2024-06-10', startTime: '09:00', endTime: '10:00', client: 'Michael Brown', issue: 'OCD' },
    { date: '2024-06-11', startTime: '14:00', endTime: '15:00', client: 'Sarah Davis', issue: 'Stress' },
  ]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [previousBlogs, setPreviousBlogs] = useState([
    { id: 1, topic: 'Life of Pie!', date: '20th May 2024' },
    { id: 2, topic: 'Life of Pie2!', date: '20th May 2024' },
    { id: 3, topic: 'Life of Pie3!', date: '20th May 2024' },
    { id: 4, topic: 'Life of Pie3!', date: '20th May 2024' },
    { id: 5, topic: 'Life of Pie3!', date: '20th May 2024' },
    { id: 6, topic: 'Life of Pie3!', date: '20th May 2024' },
    { id: 7, topic: 'Life of Pie3!', date: '20th May 2024' },
  ]);

  const fetchUserDetail = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/users/getUser');
      const data = response.data.message;
      if (data.role !== "pro") {
        navigate("/");
      }
      setLoadingUser(false);
    } catch (error) {
      if (error.response && error.response.status === 404 && error.response.data.message === "No user found!") {
        alert("seems like issue in user id :(");
        navigate("/");
      }

      if (error.response && error.response.status === 401) {
        try {
          await axios.post('http://localhost:4000/api/v1/users/refresh-token');
          await fetchUserDetail();
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          navigate(`/login/therapist`);
        }
      } else {
        console.error('Error occurred:', error);
      }
    }
  };

  const fetchSessions = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/session/one');
      const data = response.data.message;


      let formattedData = [];
      for (let i = 0; i < data.length; i++) {
        const obj = {};
        obj._id = data[i]._id;
        obj.topic = data[i].title;
        const idx = data[i].dateTime.indexOf("T");
        obj.date = data[i].dateTime.slice(0, idx);
        const date = new Date(data[i].dateTime);
        obj.startTime = `${date.getHours()}:${date.getMinutes()}`;
        date.setHours(date.getHours() + 1);
        obj.endTime = `${date.getHours()}:${date.getMinutes()}`;
        obj.dateTime = data[i].dateTime;
        formattedData.push(obj);
      }
      formattedData = [];
      setUpcomingSessions(formattedData);
      setLoadingSessions(false);
    } catch (error) {
      if (error.response && error.response.status === 404 && error.response.data.message === "No Session Found!!") {
        // no sessions for the therapist
      }
    }
  };

  useEffect(() => {
    fetchUserDetail();
    fetchSessions();
  }, []);

  const currentDate = new Date();

  const isAppointmentTimeNow = (date, startTime, endTime) => {
    const startDateTime = new Date(date + 'T' + startTime);
    const endDateTime = new Date(date + 'T' + endTime);
    return currentDate >= startDateTime && currentDate <= endDateTime;
  };

  const isSameDayAppointment = (date) => {
    const appointmentDate = new Date(date);
    const appointmentDateString = appointmentDate.toDateString();
    const currentDateDateString = currentDate.toDateString();
    return appointmentDateString === currentDateDateString;
  };

  const isPastAppointment = (date, endTime) => {
    const endDateTime = new Date(date + 'T' + endTime);
    return currentDate > endDateTime;
  };

  const isSessionNow = (time) => {
    const sessionStartTime = new Date(time);
    const now = new Date();
    const sessionEndTime = new Date(sessionStartTime.getTime() + (60 * 60 * 1000));
    if (now >= sessionStartTime && now <= sessionEndTime) {
      return 'live';
    }
    if (now > sessionEndTime) {
      return 'expired';
    }
    return 'upcoming';
  };

  const handleJoin = (id) => {
    window.location.href = `/therapist/session/${id}`;
  };

  // Skeleton Loader Components
  const SkeletonBlogCard = () => (
    <div className="mb-4 p-2 bg-gray-200 rounded-lg animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );



  const SkeletonCard = () => (
    <div className="mb-4 p-2 bg-gray-50 rounded-lg animate-pulse">
      <div className="h-6 bg-green-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-green-200 rounded w-1/2 mb-1"></div>
      <div className="h-4 bg-green-200 rounded w-1/4"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-green-50">
      <Test />
      <div className="p-5">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 md:flex-none md:w-1/3 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-green-700 text-center">Blogs</h2>
            <p className='text-center text-sm italic my-3 font-semibold font-mono'>
              SHARE YOUR VOICE: 
              <button className="font-semibold font-mono border-solid border-2 rounded-xl px-3 ml-3 bg-[#baffae] text-green-700">Write for Us!</button>
            </p>

            <h2 className="text-base font-semibold text-green-700 mt-1 italic">Your Blogs:</h2>
            <div className="mt-0 max-h-80 overflow-y-auto">
              {previousBlogs.length > 0 ? (
                previousBlogs.map((blog, index) => (
                  <div key={index} className="mb-4 p-2 bg-green-50 rounded-lg mr-1 cursor-pointer">
                    <p className="text-lg font-semibold italic text-green-900 flex justify-between items-center">{blog.topic}
                      <div>
                        <button className='mt-1 px-3 py-0 mb-0 mr-2 rounded-xl text-xs bg-sky-400 text-white border border-green-600 font-normal'>Edit</button>
                        <button className='mt-1 px-2 py-0 mb-1 rounded-xl text-xs bg-red-400 text-white border border-green-600'>Delete</button>
                      </div>
                    </p>
                    <p className="text-gray-500 text-xs italic flex justify-between items-center">{blog.date}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">You currently do not have any history of blogs!</p>
              )}
            </div>
          </div>

          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">Appointments</h2>
            <div className="mb-4">
              <h2 className="text-base font-semibold text-green-700 mt-6 italic">Upcoming Appointments:</h2>
              <div className="mt-2 max-h-80 overflow-y-auto">
                {loadingUser ? (
                  <>
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                  </>
                ) : (
                  upcomingAppointments.map((appointment, index) => (
                    <div key={index} className="mb-4 px-2 py-1 mr-1 rounded-lg bg-green-50">
                      <p className="text-lg font-semibold text-green-900 italic">{appointment.client}</p>
                      <p className="text-gray-500 text-xs italic">{appointment.date} | {appointment.startTime} - {appointment.endTime}</p>
                      <p className="text-gray-500 text-sm italic flex items-center justify-between">{appointment.issue}
                        {isAppointmentTimeNow(appointment.date, appointment.startTime, appointment.endTime) && (
                          <button className="mt-0 px-2 py-1 mb-1 rounded-xl text-xs bg-green-400 text-white border border-green-500 glow-multiple">
                            Join Now!
                          </button>
                        )}
                        {!isAppointmentTimeNow(appointment.date, appointment.startTime, appointment.endTime) && !isPastAppointment(appointment.date, appointment.endTime) && isSameDayAppointment(appointment.date) && (
                          <button className="mt-1 px-2 py-1 rounded-xl text-xs bg-gray-300 text-gray-500" disabled>
                            Appointment Today
                          </button>
                        )}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">Sessions</h2>
            <div className="mb-4">
              <h2 className="text-base font-semibold text-green-700 mt-6 italic">Upcoming Sessions:</h2>
              <div className="mt-2 max-h-80   overflow-y-auto">
                {loadingSessions ? (
                  <>
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                  </>
                ) : (
                  upcomingSessions.length > 0 ?(
                    upcomingSessions.map((session, index) => (
                    <div key={index} className="mb-4 px-2 py-1 rounded-lg bg-green-50 mr-1">
                      <p className="text-lg font-semibold text-green-900 italic">{session.topic}</p>
                      <p className="text-gray-500 text-xs italic">{session.date}</p>
                      <p className="text-gray-500 text-xs italic flex items-center justify-between">{session.startTime} - {session.endTime}
                        {isSessionNow(session.dateTime) === 'live' && (
                          <p className="mb-1 px-2 py-1 rounded-xl text-xs bg-green-400 text-white border border-green-500 glow-multiple cursor-pointer font-medium"
                            onClick={() => handleJoin(session._id)}>
                            Join Now!
                          </p>
                        )}
                        {isSessionNow(session.dateTime) === 'upcoming' && (
                          <p className="mt-1 px-2 py-1 rounded-xl text-xs bg-gray-300 cursor-default text-white" disabled>
                            Coming Soon
                          </p>
                        )}
                        {isSessionNow(session.dateTime) === 'expired' && (
                          <p className="mt-1 px-2 py-1 rounded-xl text-xs bg-red-300 text-white" disabled>
                            Session Expired
                          </p>
                        )}
                      </p>
                    </div>
                  )))
                  :(
                    <p className="text-gray-600 text-center my-10 text-sm ">You currently do not have any sessions information!</p>
                  )
                  
                 
                )}
              </div>
              <p className='text-xs font-sans italic underline text-green-600 cursor-pointer mt-2' onClick={() => navigate("/sessions")}>Browse sessions as viewer!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Therapist;
