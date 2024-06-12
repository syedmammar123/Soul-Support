import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Test from '../../components/Test';
import axios from 'axios';

const TakeTherapy = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const appointmentReasons = ['Depression', 'Anxiety', 'PTSD', 'OCD', 'Stress'];

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
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [error, setError] = useState('');

  const fetchUserDetail = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/users/getUser');
      const data = response.data.message;
      if (data.role == "pro") {
        navigate("/therapist");
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
          navigate(`/login/therapy`);
        }
      } else {
        console.error('Error occurred:', error);
      }
    }
  };

  const fetchProfessionals = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/professionals/getPro');
      const data = response.data.message;

      let formattedData = [];
      for (let i = 0; i < data.length; i++) {
        const obj = {};
        obj._id = data[i]._id;
        obj.name = data[i].name;
        obj.specialty = data[i].expertise;
        formattedData.push(obj);
      }
      setDoctors(formattedData);
    } catch (error) {
      if (error.response && error.response.status === 404 && error.response.data.message === "No therapist Found!!") {
        // no therapist
      }
    }
  };

  useEffect(() => {
    fetchUserDetail();
    fetchProfessionals();
  }, []);

  const updateTimeSlots = () => {
    const date = new Date(selectedDate);
    const day = date.getDay();

    let availableTimes = [];

    switch (day) {
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
    setSelectedDoctor('');
    setSelectedDoctorId('');
  };

  useEffect(() => {
    if (category && appointmentReasons.includes(category)) {
      setSelectedReason(category);
    }
  }, [category]);

  const handleBooking = async () => {
    const currentDateTime = new Date();
    const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);

     if (selectedDoctorId === "" || selectedDate === "" || selectedTime === "") {
      setError("Please make sure all fields are selected.");
    } else if (selectedDateTime <= currentDateTime) {
      setError("The selected date and time must be in the future.");
    } else {
      setError("");
      console.log(selectedDoctorId,selectedDate,selectedTime)
      try {
      const response = await axios.post('http://localhost:4000/api/v1/appointment/',{
        therapist:selectedDoctorId,
        date:selectedDate,
        time:selectedTime
      });

      const data = response.data.message;
      console.log(data)

     
    } catch (error) {
      if (error.response && error.response.status === 500 && error.response.data.message === "Appointment time is not available. Please choose a different time.") {
        // no therapist
      }
      setError("Appointment time is not available. Please choose a different time.")
    }
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Test />
      <div className="p-5">
        <div className="flex flex-col md:flex-row gap-6">

          <div className="flex-1 md:flex-none md:w-2/3 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-green-700">Upcoming Appointment</h2>
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
              {hasPastSessions ? previousSessions.map((session, index) => (
                <div key={index} className="mb-4 p-2 bg-gray-100 rounded-lg">
                  <h3 className="text-lg font-medium text-green-600">{session.therapist}</h3>
                  <p className="text-gray-600">{session.date}, {session.time}</p>
                </div>
              )) : (
                <p className="text-gray-600">You currently do not have any history of booked sessions!</p>
              )}
            </div>
          </div>

          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Book Appointment!</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
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
                onChange={(e) => {
                  const selectedOption = e.target.options[e.target.selectedIndex];
                  setSelectedDoctor(selectedOption.value);
                  setSelectedDoctorId(selectedOption.getAttribute('data-id'));
                }}
              >
                <option value="" disabled>Select a therapist</option>
                {doctors
                  .filter(doctor => doctor.specialty.includes(selectedReason))
                  .map((doctor, index) => (
                    <option key={index} value={doctor.name} data-id={doctor._id}>{doctor.name}</option>
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
                <option value="" disabled>Please select a time slot</option>
                {selectedDate ? updateTimeSlots() : <option value="">Please select the date first</option>}
              </select>
            </div>
            <button className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={handleBooking}>
              Book Now! <p>RS 3500</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeTherapy;
