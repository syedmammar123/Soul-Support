import React, { useEffect, useState } from 'react';
import Test from '../components/Test';
import { useNavigate } from 'react-router-dom';

const Therapist = () => {
  const navigate = useNavigate()
  const currentDate = new Date();

  const [upcomingAppointments, setUpcomingAppointments] = useState([
    { date: '2024-06-07', startTime: '17:00', endTime: '20:00', client: 'John Doe', issue: 'Depression' },
    { date: '2024-06-07', startTime: '18:00', endTime: '18:50', client: 'Jane Smith', issue: 'Anxiety' },
    { date: '2024-06-09', startTime: '12:00', endTime: '13:00', client: 'Emily Johnson', issue: 'PTSD' },
    { date: '2024-06-10', startTime: '09:00', endTime: '10:00', client: 'Michael Brown', issue: 'OCD' },
    { date: '2024-06-11', startTime: '14:00', endTime: '15:00', client: 'Sarah Davis', issue: 'Stress' },
  ]);

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

  const previousBlogs = [
    { id:1,  topic: 'Life of Pie!', date: '20th May 2024' },
    { id:2,  topic: 'Life of Pie2!', date: '20th May 2024' },
    { id:3,  topic: 'Life of Pie3!', date: '20th May 2024' },
    { id:3,  topic: 'Life of Pie3!', date: '20th May 2024' },
    { id:3,  topic: 'Life of Pie3!', date: '20th May 2024' },
    { id:3,  topic: 'Life of Pie3!', date: '20th May 2024' },
    { id:3,  topic: 'Life of Pie3!', date: '20th May 2024' },
  ];

const [upcomingSessions, setUpcomingSessions] = useState([
  { date: '2024-06-07', startTime: '17:00', endTime: '20:00', topic: 'Mindfulness Meditation', description: 'Learn techniques to reduce stress and promote mental well-being.' },
  { date: '2024-06-07', startTime: '18:00', endTime: '18:50', topic: 'Cognitive Behavioral Therapy', description: 'Understanding and challenging negative thought patterns.' },
  { date: '2024-06-09', startTime: '12:00', endTime: '13:00', topic: 'Emotional Regulation', description: 'Tools for managing intense emotions and maintaining stability.' },
  { date: '2024-06-10', startTime: '09:00', endTime: '10:00', topic: 'Self-Compassion Practice', description: 'Cultivating kindness and understanding towards oneself.' },
  { date: '2024-06-11', startTime: '14:00', endTime: '15:00', topic: 'Effective Communication Skills', description: 'Improving relationships through clear and empathetic communication.' },
]);

  const isSessionTimeNow = (date, startTime, endTime) => {
    const startDateTime = new Date(date + 'T' + startTime);
    const endDateTime = new Date(date + 'T' + endTime);

    return currentDate >= startDateTime && currentDate <= endDateTime;
  };

  const isSameDaySessions = (date) => {
    const appointmentDate = new Date(date);
    const appointmentDateString = appointmentDate.toDateString();
    const currentDateDateString = currentDate.toDateString();
    return appointmentDateString === currentDateDateString;
  };

  const isPastSessions = (date, endTime) => {
    const endDateTime = new Date(date + 'T' + endTime);
    return currentDate > endDateTime;
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
              <button className="font-semibold font-mono border-solid border-2 rounded-xl px-3 ml-3 bg-[#baffae] text-green-700">Write for Us!</button>
            </p>

            <h2 className="text-base font-semibold text-green-700 mt-1 italic">Your Blogs:</h2>
            
            <div className="mt-0 max-h-80 overflow-y-auto">
      
              {previousBlogs.length>0
              ?
              
              previousBlogs.map((blog, index) => (
                <div key={index} className="mb-4 p-2 bg-green-50 rounded-lg mr-1 cursor-pointer">
                  
                  <p className="text-lg font-semibold italic text-green-900 flex justify-between items-center">{blog.topic}
                    <div>
                     <button className='mt-1 px-3 py-0 mb-0 mr-2  rounded-xl text-xs bg-sky-400 text-white border border-green-600 font-normal'>Edit</button>
                  <button className='mt-1 px-2 py-0 mb-1 rounded-xl text-xs bg-red-400 text-white border border-green-600'>Delete</button>
                  </div>
                  </p>
                  <p className="text-gray-500 text-xs italic flex justify-between items-center">{blog.date} </p>
                </div>
              ))
            :
              <p className="text-gray-600">You currently do not have any history of booked sessions!</p>}
              
            </div>
          </div>
          
          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">Appointments</h2>
            <div className="mb-4">
              <h2 className="text-base font-semibold text-green-700 mt-6 italic">Upcoming Appointments:</h2>
              <div className="mt-2 max-h-80 overflow-y-auto">
                {upcomingAppointments.map((appointment, index) => (
                  <div key={index} className="mb-4 px-2 py-1 mr-1 rounded-lg  bg-green-50 " >
                    <p className="text-lg font-semibold text-green-900 italic">{appointment.client}</p>
                    <p className="text-gray-500 text-xs italic">{appointment.date} | {appointment.startTime} - {appointment.endTime}</p>
                    <p className="text-gray-500 text-sm italic flex items-center justify-between ">{appointment.issue}                  {isAppointmentTimeNow(appointment.date, appointment.startTime, appointment.endTime) && (
                      // <button className="mt-0 px-2 py-1 mb-1 rounded-xl text-xs bg-green-400 text-white border border-green-500">
                      //   Join Now!
                      // </button>
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
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">Sessions</h2>
            <div className="mb-4">
              <h2 className="text-base font-semibold text-green-700 mt-6 italic">Upcoming Sessions:</h2>
              
              <div className="mt-2 max-h-80 overflow-y-auto">
                {upcomingSessions.map((session, index) => (
                  <div key={index} className="mb-4 px-2 py-1 rounded-lg  bg-green-50 mr-1">
                    <p className="text-lg font-semibold text-green-900 italic">{session.topic}</p>
                    <p className="text-gray-500 text-xs italic">{session.date}</p>
                    <p className= "text-gray-500 text-xs italic flex items-center justify-between"> {session.startTime} - {session.endTime} {isSessionTimeNow(session.date, session.startTime, session.endTime) && (
                      <button className="mb-1 px-2 py-1 rounded-xl text-xs bg-green-400 text-white border border-green-500 glow-multiple">
                        Join Now!
                      </button>
                    )}
                    {!isSessionTimeNow(session.date, session.startTime, session.endTime) && !isPastAppointment(session.date, session.endTime) && isSameDaySessions(session.date) && (
                      <button className="mt-1 px-2 py-1 rounded-xl text-xs bg-gray-300 text-gray-500" disabled>
                        Session Today
                      </button>
                    )}
                    </p>

                  </div>
                ))}
              </div>
              <p className='text-xs font-sans italic underline text-green-600 cursor-pointer mt-2' onClick={()=>navigate("/sessions")}>Browse sessions as viewer!</p>
            </div>
          </div>
                    
        </div>

        {/* <JoinCall /> */}
      </div>
    </div>
  );
};

export default Therapist;
