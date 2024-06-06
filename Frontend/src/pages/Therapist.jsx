import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Test from '../components/Test';
import Professionals from '../components/Professionals';

const Therapist = () => {
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
  const previousBlogs = [
    { id:1,  topic: 'Life of Pie!', date: '20th May 2024' },
    { id:2,  topic: 'Life of Pie2!', date: '20th May 2024' },
    { id:3,  topic: 'Life of Pie3!', date: '20th May 2024' },
    { id:3,  topic: 'Life of Pie3!', date: '20th May 2024' },
    { id:3,  topic: 'Life of Pie3!', date: '20th May 2024' },
    { id:3,  topic: 'Life of Pie3!', date: '20th May 2024' },
    { id:3,  topic: 'Life of Pie3!', date: '20th May 2024' },
  ];

  const upcomingSession = {
    therapist: 'Dr. Syed Muhammad Ammar',
    date: '25th June 2024',
    time: '4pm-5pm'
  };

  // const hasPastSessions = previousSessions.length > 0;
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


  return (
    <div className="min-h-screen bg-green-50">
      <Test />
      <div className="p-5">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 md:flex-none md:w-1/3 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-green-700 text-center">Blogs</h2>
            <p className='text-center text-sm italic my-4 font-semibold font-mono'>
              SHARE YOUR VOICE: 
              <button className="font-semibold font-mono border-solid border-2 rounded-xl p-2 ml-3 bg-[#baffae] text-green-700">Write for Us!</button>
            </p>

            <h2 className="text-xl font-semibold text-green-700 mt-6">Your Blogs:</h2>
            
            <div className="mt-4 max-h-80 overflow-y-auto">
      
              {previousBlogs.length>0
              ?
              
              previousBlogs.map((blog, index) => (
                <div key={index} className="mb-4 p-2 bg-green-50 rounded-lg">
                  
                  <p className="text-lg font-semibold italic text-green-900 flex justify-between items-center">{blog.topic} <button className='text-base border py-1 px-3 rounded-lg text-white bg-green-300 font-light '>Edit</button></p>
                  <p className="text-gray-500 text-xs italic flex justify-between items-center">{blog.date} <button className='text-base border py-1 px-3 rounded-lg text-white bg-green-300 font-light mt-1'>Delete</button></p>
                </div>
              ))
            :
              <p className="text-gray-600">You currently do not have any history of booked sessions!</p>}
              
            </div>
          </div>
          
          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center"> Appointments</h2>
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
          
          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">Sessions</h2>
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
    <Professionals></Professionals>
    </div>
  );
};

export default Therapist;
