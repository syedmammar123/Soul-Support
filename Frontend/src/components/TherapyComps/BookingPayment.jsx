import { useState } from 'react'
// import  './payment.css'
import StripeContainer from '../Stripe/StripeContainer';

function BookingPayment() {
  const [showItem, setShowItem] = useState(false);
  return (
    <>
      <h1>Book Your Session!</h1>
			{showItem ? (
				<StripeContainer />
			) : (
				<>
					<h3>Rs 3500/session</h3>
					<button className='BookButton' onClick={() => setShowItem(true)}>Book Appointment</button>
				</>
			)}
    </>
  )
}

export default BookingPayment;
