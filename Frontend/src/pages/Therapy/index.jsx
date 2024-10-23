import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Test from "../../components/Navbar";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { appointmentReasons } from "../../utils/therapyData";
import { backendUrl } from "../../constants";

const TakeTherapy = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const [error, setError] = useState("");

  const fetchUserDetail = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/v1/users/getUser`);
      const data = response.data.message;
      if (data.role == "pro") {
        navigate("/therapist");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 404 &&
        error.response.data.message === "No user found!"
      ) {
        alert("seems like issue in user id :(");
        navigate("/");
      }
      if (error.response && error.response.status === 401) {
        try {
          await axios.post(`${backendUrl}/api/v1/users/refresh-token`);
          await fetchUserDetail();
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          alert("lol");
          navigate(`/login/therapy`);
        }
      } else {
        console.error("Error occurred:", error);
      }
    }
  };

  const fetchProfessionals = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/v1/professionals/getPro`
      );
      const data = response.data.message;

      let formattedData = [];
      for (let i = 0; i < data.length; i++) {
        const obj = {};
        obj._id = data[i].userId;
        obj.name = data[i].name;
        obj.specialty = data[i].expertise;
        formattedData.push(obj);
      }
      setDoctors(formattedData);
    } catch (error) {
      if (
        error.response &&
        error.response.status === 404 &&
        error.response.data.message === "No therapist Found!!"
      ) {
        // no therapist
      }
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/v1/appointment`);
      const data = response.data.message;

      let formattedData = [];
      for (let i = 0; i < data.length; i++) {
        const obj = {};
        obj._id = data[i]._id;

        const [time, modifier] = data[i].time.split(" ");
        let [hours, minutes] = time.split(":");

        if (modifier === "PM" && hours !== "12") {
          hours = parseInt(hours, 10) + 12;
        } else if (modifier === "AM" && hours === "12") {
          hours = "00";
        }

        const formattedTime = `${hours}:${minutes}`;

        const idx = data[i].date.indexOf("T");
        obj.date = data[i].date.slice(0, idx);
        const date = new Date(`${data[i].date.slice(0, idx)}T${formattedTime}`);
        obj.dateTime = date;
        obj.startTime = `${date.getHours()}:${date.getMinutes()}0`;
        date.setHours(date.getHours() + 1);
        obj.endTime = `${date.getHours()}:${date.getMinutes()}0`;
        obj.time = data[i].time;
        obj.therapistName = data[i].therapistName;
        obj.therapistId = data[i].therapist;
        obj.patientId = data[i].patient;
        formattedData.push(obj);
      }

      formattedData.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

      setUpcomingAppointments(formattedData);
      setLoadingAppointments(false);
    } catch (error) {
      if (
        error.response &&
        error.response.status === 404 &&
        error.response.data.message === "No appointment Found!!"
      ) {
        setLoadingAppointments(false);
      }
    }
  };

  useEffect(() => {
    fetchUserDetail();
    fetchProfessionals();
    fetchAppointments();
  }, []);

  const updateTimeSlots = () => {
    const date = new Date(selectedDate);
    const day = date.getDay();

    let availableTimes = [];

    switch (day) {
      case 0: // Sunday
        availableTimes = [
          "10:00 AM",
          "11:00 AM",
          "12:00 PM",
          "1:00 PM",
          "2:00 PM",
          "3:00 PM",
          "4:00 PM",
          "5:00 PM",
          "6:00 PM",
          "7:00 PM",
          "8:00 PM",
        ];
        break;
      case 1: // Monday
      case 3: // Wednesday
      case 5: // Friday
        availableTimes = [
          "11:00 AM",
          "12:00 PM",
          "1:00 PM",
          "2:00 PM",
          "3:00 PM",
          "4:00 PM",
        ];
        break;
      case 2: // Tuesday
      case 4: // Thursday
      case 6: // Saturday
        availableTimes = [
          "4:00 PM",
          "5:00 PM",
          "6:00 PM",
          "7:00 PM",
          "8:00 PM",
        ];
        break;
      default:
        availableTimes = [];
    }

    return availableTimes.map((time) => (
      <option key={time} value={time}>
        {time}
      </option>
    ));
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedTime(""); // Reset selected time when date changes
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleReasonChange = (e) => {
    const reason = e.target.value;
    setSelectedReason(reason);
    // Filter doctors based on selected reason
    const filteredDoctors = doctors.filter((doctor) =>
      doctor.specialty.includes(reason)
    );
    // Set the first doctor from the filtered list as selectedDoctor
    setSelectedDoctor("");
    setSelectedDoctorId("");
  };

  useEffect(() => {
    if (category && appointmentReasons.includes(category)) {
      setSelectedReason(category);
    }
  }, [category]);

  const handleBooking = async () => {
    const currentDateTime = new Date();

    const [time, modifier] = selectedTime.split(" ");
    let [hours, minutes] = time.split(":");

    if (modifier === "PM" && hours !== "12") {
      hours = parseInt(hours, 10) + 12;
    } else if (modifier === "AM" && hours === "12") {
      hours = "00";
    }

    const formattedTime = `${hours}:${minutes}`;
    const selectedDateTime = new Date(`${selectedDate}T${formattedTime}`);

    if (selectedDoctorId === "" || selectedDate === "" || selectedTime === "") {
      setError("Please make sure all fields are selected.");
    } else if (selectedDateTime.getTime() <= currentDateTime.getTime()) {
      setError("The selected date and time must be in the future.");
    } else {
      setError("");
      try {
        const response = await axios.post(
          `${backendUrl}/api/v1/appointment/validate`,
          {
            therapist: selectedDoctorId,
            date: selectedDate,
            time: selectedTime,
          }
        );

        if (
          response.status === 200 &&
          response.data.data === "Appointment slot is available!"
        ) {
          const stripe = await loadStripe(
            import.meta.env.VITE_STRIPE_PUBLUSH_KEY
          );

          const checkoutSessionResponse = await axios.post(
            `${backendUrl}/api/v1/payment/create-checkout-session`,
            {
              therapist: selectedDoctorId,
              date: selectedDate,
              time: selectedTime,
              amount: 2500,
            }
          );

          const session = checkoutSessionResponse.data.sessionId;

          const result = await stripe.redirectToCheckout({
            sessionId: session,
          });
        } else {
          setError(
            "Appointment time is not available. Please choose a different time."
          );
        }
      } catch (error) {
        if (
          error.response &&
          error.response.status === 500 &&
          error.response.data.message ===
            "Appointment time is not available. Please choose a different time."
        ) {
          setError(
            "Appointment time is not available. Please choose a different time."
          );
        } else {
          setError("unknown error occured. Please try again.");
        }
      }
    }
  };

  const SkeletonCard = () => (
    <div className="mb-4 p-2 bg-gray-50 rounded-lg animate-pulse">
      <div className="h-6 bg-green-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-green-200 rounded w-1/2 mb-1"></div>
      <div className="h-4 bg-green-200 rounded w-1/4"></div>
    </div>
  );

  const handleJoinAppointmentCall = (id) => {
    window.location.href = `/therapyCall/${id}`;
  };

  const isAppointNow = (date, time) => {
    const [timeString, modifier] = time.split(" ");
    let [hours, minutes] = timeString.split(":");
    hours = parseInt(hours, 10);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    } else if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    // Combine date and time
    const sessionStartTime = new Date(
      `${date}T${hours.toString().padStart(2, "0")}:${minutes.padStart(
        2,
        "0"
      )}:00`
    );
    const now = new Date();
    const sessionEndTime = new Date(
      sessionStartTime.getTime() + 60 * 60 * 1000
    );

    if (now >= sessionStartTime && now <= sessionEndTime) {
      return "live";
    }
    if (now > sessionEndTime) {
      return "expired";
    }
    return "upcoming";
  };

  const handleJoinChat = (patientId, therapistId) => {
    window.location.href = `chat/${patientId}/${therapistId}`;
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Test />
      <div className="p-5">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 md:flex-none md:w-2/3 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-green-700">
              Your Appointment
            </h2>
            <div className="mt-2 max-h-[100vh] overflow-y-auto">
              {loadingAppointments ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment, index) => (
                  <div
                    key={index}
                    className="mb-4 px-2 py-1 mr-1 rounded-lg bg-green-50 "
                  >
                    {console.log(appointment)}
                    <p className="text-lg font-semibold text-green-900 italic ">
                      Dr. {appointment.therapistName}
                    </p>
                    <p className="text-gray-500 text-xs italic flex items-center justify-between">
                      {appointment.date}
                      <span
                        className="mb-1 px-2 py-1 rounded-xl text-xs bg-green-200 text-blue-800 border border-green-500  cursor-pointer "
                        onClick={() =>
                          handleJoinChat(
                            appointment.patientId,
                            appointment.therapistId
                          )
                        }
                      >
                        Chat Now!
                      </span>
                    </p>
                    <p className="text-gray-500 text-xs italic flex items-center justify-between mb-1">
                      {appointment.time}
                      {isAppointNow(appointment.date, appointment.time) ===
                        "live" && (
                        <p
                          className="mb-1 px-2 py-1 rounded-xl text-xs bg-green-400 text-white border border-green-500 glow-multiple cursor-pointer font-medium"
                          onClick={() =>
                            handleJoinAppointmentCall(appointment._id)
                          }
                        >
                          Join Now!
                        </p>
                      )}
                      {isAppointNow(appointment.date, appointment.time) ===
                        "upcoming" && (
                        <p
                          className="mt-1 px-2 py-1 rounded-xl text-xs bg-gray-300 cursor-default text-white"
                          disabled
                        >
                          Coming Soon
                        </p>
                      )}
                      {isAppointNow(appointment.date, appointment.time) ===
                        "expired" && (
                        <p
                          className="mt-1 px-2 py-1 rounded-xl text-xs bg-red-300 text-white"
                          disabled
                        >
                          Appointment Expired
                        </p>
                      )}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center my-10 text-sm ">
                  You currently do not have any appointments booked!
                </p>
              )}
            </div>
          </div>

          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Book Appointment!
            </h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <label className="block text-gray-700">Appointment Reason:</label>
              <select
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                value={selectedReason}
                onChange={handleReasonChange}
              >
                <option value="">Select an appointment reason</option>
                {appointmentReasons.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Choose a Therapist:</label>
              <select
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                value={selectedDoctor}
                onChange={(e) => {
                  const selectedOption =
                    e.target.options[e.target.selectedIndex];
                  setSelectedDoctor(selectedOption.value);
                  setSelectedDoctorId(selectedOption.getAttribute("data-id"));
                }}
              >
                <option value="" disabled>
                  Select a therapist
                </option>
                {doctors
                  .filter((doctor) => doctor.specialty.includes(selectedReason))
                  .map((doctor, index) => (
                    <option
                      key={index}
                      value={doctor.name}
                      data-id={doctor._id}
                    >
                      {doctor.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 mb-2">Available Time Slots:</p>
              <p className="text-sm text-gray-500 mb-4">
                Monday, Wednesday, Friday: 11am - 4pm
                <br />
                Tuesday, Thursday, Saturday: 4pm - 9pm
                <br />
                Sunday: 10am - 8pm
              </p>
              <label className="block text-gray-700">Choose a Date:</label>
              <input
                type="date"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                onChange={handleDateChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Choose a Time:</label>
              <select
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                value={selectedTime}
                onChange={handleTimeChange}
              >
                <option value="" disabled>
                  Please select a time slot
                </option>
                {selectedDate ? (
                  updateTimeSlots()
                ) : (
                  <option value="">Please select the date first</option>
                )}
              </select>
            </div>
            <button
              className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={handleBooking}
            >
              Book Now! <p>RS 3500</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeTherapy;
