// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Test from '../../components/Test';
// import BookingPayment from '../../components/TherapyComps/BookingPayment';
// import JoinCall from '../../components/JoinCall';

// const TakeTherapy = () => {
//   const navigate = useNavigate();
//   const [showBookingPayment, setShowBookingPayment] = useState(false);

//   // const username = Cookies.get('username');
//   // const role = Cookies.get('role');

//   useEffect(() => {
//     // if (username == null) {
//     //   navigate('/login');
//     // }
//   }, []);


//   return (

//     <div>
//       <Test/>
//       <div>
//         upcomingSessoions
//         you currently donot have not booked any session Yet!
//         <br />
//         Dr Syed Muhammad Ammar
//         25th June 2024 4pm-5pm

//         <button disabled> Join </button>

//         <div>
//           Book Another Appointment!
//           Choose a Therapist: <input type="text" name="" id="" />
//           Choose a Date: <input type="date" name="" id="" />
//           Choose a Date: <input type="time" name="" id="" />

//           <button>Book Now! <p> RS 3500</p></button>

//           {/* If No Error, then proceed to stripe page, after successfull payment we should be redirected to the booking/thrapy page. */}
//         </div>

//       </div>
//         {/* <BookingPayment />
     
//         <JoinCall />     */}
   
//     </div>
//   );
// };

// export default TakeTherapy;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Test from '../../components/Test';
import BookingPayment from '../../components/TherapyComps/BookingPayment';
import JoinCall from '../../components/JoinCall';

const TakeTherapy = () => {
  const { category } = useParams();
  

  const appointmentReasons = ['Depression', 'Anxiety', 'PTSD', 'OCD', 'Stress'];

  const doctors = [
    { name: 'Dr. Alice', specialty: ['Depression', 'Anxiety'] },
    { name: 'Dr. Bob', specialty: ['PTSD', 'OCD'] },
    { name: 'Dr. Carol', specialty: ['Depression', 'Stress'] },
    { name: 'Dr. David', specialty: ['Anxiety', 'PTSD'] },
    { name: 'Dr. Emily', specialty: ['OCD', 'Stress'] },
    { name: 'Dr. Frank', specialty: ['Depression', 'OCD'] },
    { name: 'Dr. Grace', specialty: ['Anxiety', 'Stress'] },
    { name: 'Dr. Henry', specialty: ['Depression', 'Anxiety', 'PTSD'] },
    { name: 'Dr. Irene', specialty: ['OCD', 'Stress'] },
    // Add more doctors as needed
  ];
  const previousSessions = [
    { therapist: 'Dr. Jane Doe', date: '20th May 2024', time: '2pm-3pm' },
    { therapist: 'Dr. John Smith', date: '10th April 2024', time: '11am-12pm' },
    // Add more sessions as needed
  ];

  const upcomingSession = {
    therapist: 'Dr. Syed Muhammad Ammar',
    date: '25th June 2024',
    time: '4pm-5pm'
  };

  const hasPastSessions = previousSessions.length > 0;
  const hasUpcomingSession = Boolean(upcomingSession);

  const [showBookingPayment, setShowBookingPayment] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedReason, setSelectedReason] = useState('');


  const updateTimeSlots = () => {
    const date = new Date(selectedDate);
    const day = date.getDay();

    let availableTimes = [];

    switch(day) {
      case 0: // Sunday
        availableTimes = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];
        break;
      case 1: // Monday
      case 3: // Wednesday
      case 5: // Friday
        availableTimes = ['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
        break;
      case 2: // Tuesday
      case 4: // Thursday
      case 6: // Saturday
        availableTimes = ['4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];
        break;
      default:
        availableTimes = [];
    }

    return availableTimes.map(time => (
      <option key={time} value={time}>{time}</option>
    ));
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedTime(''); // Reset selected time when date changes
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleReasonChange = (e) => {
  const reason = e.target.value;
  setSelectedReason(reason);
  // Filter doctors based on selected reason
  const filteredDoctors = doctors.filter(doctor => doctor.specialty.includes(reason));
  // Set the first doctor from the filtered list as selectedDoctor
  setSelectedDoctor(filteredDoctors.length > 0 ? filteredDoctors[0].name : '');
};

  useEffect(() => {
      if (category && appointmentReasons.includes(category)) {
      setSelectedReason(category);
    }
  }, [category]);

  // const username = Cookies.get('username');
  // const role = Cookies.get('role');

  useEffect(() => {
    // if (username == null) {
    //   navigate('/login');
    // }
  }, []);

  return (
    <div className="min-h-screen bg-green-50">
      <Test />
      <div className="p-5">
        <div className="flex flex-col md:flex-row gap-6">
          {/* <div className="flex-1 md:flex-none md:w-2/3 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-green-700">Upcoming Sessions</h2>
            <p className="text-gray-600">You currently do not have any sessions booked yet!</p>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-green-600">Dr. Syed Muhammad Ammar</h3>
              <p className="text-gray-600">25th June 2024, 4pm-5pm</p>
              <button disabled className="mt-2 px-4 py-2 bg-gray-300 text-white rounded cursor-not-allowed">Join</button>
            </div>
          </div> */}



          <div className="flex-1 md:flex-none md:w-2/3 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-green-700">Upcoming Sessions</h2>
            {hasUpcomingSession ? (
              <>
              
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-green-600">{upcomingSession.therapist}</h3>
                  <p className="text-gray-600">{upcomingSession.date}, {upcomingSession.time}</p>
                  <button disabled className="mt-2 px-4 py-2 bg-gray-300 text-white rounded cursor-not-allowed">Join</button>
                </div>
              </>
            ) : (
              <p className="text-gray-600">You currently do not have any sessions booked yet!</p>
            )}

            <h2 className="text-xl font-semibold text-green-700 mt-6">Past Sessions</h2>
            
            <div className="mt-4 max-h-48 overflow-y-auto">
      
              {previousSessions.length>0
              ?
              
              previousSessions.map((session, index) => (
                <div key={index} className="mb-4 p-2 bg-gray-100 rounded-lg">
                  <h3 className="text-lg font-medium text-green-600">{session.therapist}</h3>
                  <p className="text-gray-600">{session.date}, {session.time}</p>
                </div>
              ))
            :
              <p className="text-gray-600">You currently do not have any history of booked sessions!</p>}
              
            </div>
          </div>
{/* 
          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-4">Book Appointment!</h2>
              <div className="mb-4">
                <label className="block text-gray-700">Choose a Therapist:</label>
                <input type="text" className="mt-1 p-2 border border-gray-300 rounded w-full" />
              </div>
              <div className="mb-4">
                <p className="text-gray-700 mb-2">Available Time Slots:</p>
                <p className="text-sm text-gray-500 mb-4">
                  Monday, Wednesday, Friday: 11am - 4pm<br />
                  Tuesday, Thursday, Saturday: 4pm - 9pm<br />
                  Sunday: 10am - 8pm
                </p>
                <label className="block text-gray-700">Choose a Date:</label>
                <input type="date" className="mt-1 p-2 border border-gray-300 rounded w-full" onChange={handleDateChange} />
              </div>
              <div className="mb-4">
                
                <label className="block text-gray-700">Choose a Time:</label>
                <select className="mt-1 p-2 border border-gray-300 rounded w-full" value={selectedTime} onChange={handleTimeChange}>
                  {selectedDate ? updateTimeSlots() : <option value="">Please select the date first</option>}
                </select>
              </div>
              <button className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Book Now! <p>RS 3500</p>
              </button>
          </div> */}

          
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Book Appointment!</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Appointment Reason:</label>
            <select
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              value={selectedReason}
              onChange={handleReasonChange}
            >
              <option value="">Select an appointment reason</option>
              {appointmentReasons.map(reason => (
                <option key={reason} value={reason}>{reason}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Choose a Therapist:</label>
            <select
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              {doctors
                .filter(doctor => doctor.specialty.includes(selectedReason))
                .map(doctor => (
                  <option key={doctor.name} value={doctor.name}>{doctor.name}</option>
                ))}
            </select>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 mb-2">Available Time Slots:</p>
            <p className="text-sm text-gray-500 mb-4">
              Monday, Wednesday, Friday: 11am - 4pm<br />
              Tuesday, Thursday, Saturday: 4pm - 9pm<br />
              Sunday: 10am - 8pm
            </p>
            <label className="block text-gray-700">Choose a Date:</label>
            <input type="date" className="mt-1 p-2 border border-gray-300 rounded w-full" onChange={handleDateChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Choose a Time:</label>
            <select className="mt-1 p-2 border border-gray-300 rounded w-full" value={selectedTime} onChange={handleTimeChange}>
              {selectedDate ? updateTimeSlots() : <option value="">Please select the date first</option>}
            </select>
          </div>
          <button className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Book Now! <p>RS 3500</p>
          </button>
        </div>
      

        
        </div>

        {/* <BookingPayment />
        <JoinCall /> */}
      </div>
    </div>
  );
};

export default TakeTherapy;
