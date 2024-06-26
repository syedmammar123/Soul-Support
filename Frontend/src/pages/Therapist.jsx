import React, { useEffect, useState } from 'react';
import Test from '../components/Test';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Therapist = () => {
  const navigate = useNavigate();
  
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const fetchUserDetail = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/users/getUser');
      const data = response.data.message;
      setLoadingUser(false);

      if (data.role !== "pro") {
        navigate("/");
      }
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
      data[0].dateTime = new Date().toISOString()

      let formattedData = [];
      for (let i = 0; i < data.length; i++) {
        const obj = {};
        obj._id = data[i]._id;
        obj.topic = data[i].title;
        const idx = data[i].dateTime.indexOf("T");
        obj.date = data[i].dateTime.slice(0, idx);
        const date = new Date(data[i].dateTime);
        obj.startTime = `${date.getHours()>9?"":"0"}${date.getHours()}:${date.getMinutes()}${date.getMinutes()>9?"":"0"}`;
        date.setHours(date.getHours() + 1);
        obj.endTime = `${date.getHours()>9?"":"0"}${date.getHours()}:${date.getMinutes()}${date.getMinutes()>9?"":"0"}`;
        obj.dateTime = data[i].dateTime;
        formattedData.push(obj);
      }
      setUpcomingSessions(formattedData);
      setLoadingSessions(false);
    } catch (error) {
      if (error.response && error.response.status === 404 && error.response.data.message === "No Session Found!!") {
        // no sessions for the therapist
        setLoadingSessions(false);
      }
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/appointment');
      const data = response.data.message;

      let formattedData = [];
      for (let i = 0; i < data.length; i++) {
        const obj = {};
        obj._id = data[i]._id;
        

        const [time, modifier] = data[i].time.split(' ');
        let [hours, minutes] = time.split(':');
        
        
        
        if (modifier === 'PM' && hours !== '12') {
          hours = parseInt(hours, 10) + 12;
        } else if (modifier === 'AM' && hours === '12') {
          hours = '00';
        }
    
        const formattedTime = `${hours}:${minutes}`;
        
        const idx = data[i].date.indexOf("T");
        obj.date = data[i].date.slice(0, idx);
        const date = new Date(`${data[i].date.slice(0, idx)}T${formattedTime}`);
        obj.dateTime = date
        
        
        obj.startTime = `${date.getHours()>9?"":"0"}${date.getHours()}:${date.getMinutes()}${date.getMinutes()>9?"":"0"}`;
        date.setHours(date.getHours() + 1);
        obj.endTime = `${date.getHours()>9?"":"0"}${date.getHours()}:${date.getMinutes()}${date.getMinutes()>9?"":"0"}`;
        obj.time = data[i].time;
        obj.patientName = data[i].patientName;
        formattedData.push(obj);
      }
      setUpcomingAppointments(formattedData)
      setLoadingAppointments(false);
    } catch (error) {
      if (error.response && error.response.status === 404 && error.response.data.message === "No appointment Found!!") {
        setLoadingAppointments(false);
        
      }
    }
  };

  const fetchBlogs = async () => {
    try {
      
      const res = await axios.get(`http://localhost:4000/api/v1/blogs/pro`);
      const blogData = res.data.data
      setBlogs(blogData);
      setLoadingBlogs(false);

    } catch (error) {
      console.error(error)
      if (error.response && error.response.status === 404 && error.response.data.message === "No blog found!") {
        setLoadingBlogs(false);
      }
    }
  };

  useEffect(() => {
    fetchUserDetail();
    fetchBlogs()
    fetchSessions();
    fetchAppointments()
  }, []);

  const currentDate = new Date();

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

  const isAppointNow = (date, time) => {


    const [timeString, modifier] = time.split(' ');
    let [hours, minutes] = timeString.split(':');
    hours = parseInt(hours, 10);

    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    // Combine date and time
    const sessionStartTime = new Date(`${date}T${hours.toString().padStart(2, '0')}:${minutes.padStart(2, '0')}:00`);
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
  const handleJoinAppointmentCall = (id) => {
    window.location.href = `/therapist/therapyCall/${id}`;
  };

  const SkeletonCard = () => (
    <div className="mb-4 p-2 bg-gray-50 rounded-lg animate-pulse">
      <div className="h-6 bg-green-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-green-200 rounded w-1/2 mb-1"></div>
      <div className="h-4 bg-green-200 rounded w-1/4"></div>
    </div>
  );

    const handleDelete = async (id) => {
      const confirmed = window.confirm("Are you sure you want to delete this blog?");
      if (!confirmed) return;


      try {
         
      
        let res = await axios.delete(`http://localhost:4000/api/v1/blogs/${id}`);
        fetchBlogs()
        
        // navigate("/blogs");
      } catch (err) {
        console.error(err);
      }
    };

  return (
    <div className="min-h-screen bg-green-50">
      <Test />
      <div className="p-5">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 md:flex-none md:w-1/3 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-green-700 text-center">Blogs</h2>
            <p className='text-center text-sm italic my-3 font-semibold font-mono'>
              SHARE YOUR VOICE: 
              <button className="text-white bg-gradient-to-r from-green-500 via-green-500 to-green-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-xl text-sm px-2 py-1 text-center me-2 mb-2 ms-2"
              
              onClick={() => navigate(`/write`)}
              
              >Write for Us!</button>
            </p>

            <h2 className="text-base font-semibold text-green-700 mt-1 italic">Your Blogs:</h2>
            <div className="mt-0 max-h-80 overflow-y-auto">
              
              {loadingBlogs? (
                  <>
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                  </>
                ) : (
              blogs.length > 0 ? (
                blogs.map((blog, index) => (
                  <div key={index} className="mb-4 p-2 bg-green-50 rounded-lg mr-1">
                    <p className="text-sm font-semibold italic text-green-900 flex justify-between items-center">{blog.title}
                    <div className="flex flex-wrap gap-1">
                      <button
                        className="px-1 py-0 rounded-xl text-xs bg-green-300 text-white border border-green-100"
                        onClick={() => navigate(`/blog/${blog._id}`)}
                        style={{ minWidth: "3rem" }} 
                      >
                        View
                      </button>
                      <button
                        className="px-1 py-0 rounded-xl text-xs bg-sky-400 text-white border border-green-100 "
                        onClick={() => navigate(`/write?edit=${blog?._id}`,{state:blog})}
                        style={{ minWidth: "3rem" }}
                      >
                        Edit
                      </button>
                      <button
                        className="px-1 py-0 rounded-xl text-xs bg-red-400 text-white border border-green-100"
                        onClick={()=>handleDelete(blog._id)}
                        style={{ minWidth: "3rem" }} 
                      >
                        Delete
                      </button>
                    </div>
                    </p>
                    <p className="text-gray-500 text-xs italic flex justify-between items-center">{blog?.updatedAt?.slice(0, 10)}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center my-10 text-sm">You currently do not have any blogs!</p>
              ))}
            
            </div>
          </div>

          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">Appointments</h2>
            <div className="mb-4">
              <h2 className="text-base font-semibold text-green-700 mt-6 italic">Your Appointments:</h2>
              <div className="mt-2 max-h-80 overflow-y-auto">
                {loadingAppointments ? (
                  <>
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                  </>
                ) : (
                  upcomingAppointments.length > 0 ?(
                  upcomingAppointments.map((appointment, index) => (
                    <div key={index} className="mb-4 px-2 py-1 mr-1 rounded-lg bg-green-50">
                      <p className="text-lg font-semibold text-green-900 italic">{appointment.patientName}</p>
                      <p className="text-gray-500 text-xs italic">{appointment.date}</p>
                      <p className="text-gray-500 text-xs italic flex items-center justify-between">
                      {appointment.startTime} - {appointment.endTime}
                      {isAppointNow(appointment.date, appointment.time) === 'live' && (
                        <span className="mb-1 px-2 py-1 rounded-xl text-xs bg-green-400 text-white border border-green-500 glow-multiple cursor-pointer font-medium"
                              onClick={() => handleJoinAppointmentCall(appointment._id)}>
                          Join Now!
                        </span>
                      )}
                      {isAppointNow(appointment.date, appointment.time) === 'upcoming' && (
                        <span className="mt-1 px-2 py-1 rounded-xl text-xs bg-gray-300 cursor-default text-white" disabled>
                          Coming Soon
                        </span>
                      )}
                      {isAppointNow(appointment.date, appointment.time) === 'expired' && (
                        <span className="mt-1 px-2 py-1 rounded-xl text-xs bg-red-300 text-white" disabled>
                          Appointment Expired
                        </span>
                      )}
                    </p>
                    </div>
                  )))
                  :(
                    <p className="text-gray-600 text-center my-10 text-sm ">You currently do not have any appointments booked!</p>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">Sessions</h2>
            <div className="mb-4">
              <h2 className="text-base font-semibold text-green-700 mt-6 italic">Your Sessions:</h2>
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
                      <p className="text-gray-500 text-xs italic flex items-center justify-between">
                        {session.startTime} - {session.endTime}
                        {isSessionNow(session.dateTime) === 'live' && (
                          <span className="mb-1 px-2 py-1 rounded-xl text-xs bg-green-400 text-white border border-green-500 glow-multiple cursor-pointer font-medium"
                                onClick={() => handleJoin(session._id)}>
                            Join Now!
                          </span>
                        )}
                        {isSessionNow(session.dateTime) === 'upcoming' && (
                          <span className="mt-1 px-2 py-1 rounded-xl text-xs bg-gray-300 cursor-default text-white" disabled>
                            Coming Soon
                          </span>
                        )}
                        {isSessionNow(session.dateTime) === 'expired' && (
                          <span className="mt-1 px-2 py-1 rounded-xl text-xs bg-red-300 text-white" disabled>
                            Session Expired
                          </span>
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
