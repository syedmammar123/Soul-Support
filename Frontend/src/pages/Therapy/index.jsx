import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Test from '../../components/Test';
import BookingPayment from '../../components/TherapyComps/BookingPayment';
import JoinCall from '../../components/JoinCall';

const TakeTherapy = () => {
  const navigate = useNavigate();
  const [showBookingPayment, setShowBookingPayment] = useState(false);

  // const username = Cookies.get('username');
  // const role = Cookies.get('role');

  useEffect(() => {
    // if (username == null) {
    //   navigate('/login');
    // }
  }, []);


  return (

    <div>
      <Test/>
        <BookingPayment />
     
        <JoinCall />    
   
    </div>
  );
};

export default TakeTherapy;
