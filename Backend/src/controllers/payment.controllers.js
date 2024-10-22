import { asyncHandler } from "../utils/asyncHandler.js";
import { Appointment } from "../models/appointment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Stripe from "stripe";

const stripe = Stripe(process.env.STRIPE_SECRET_TEST);

//makePaymentUsingReactElement 
const makePayment = asyncHandler(async (req, res) => { 
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Therapy Money",
			// payment_method: id,
			payment_method: id,         
			application_fee_amount: 367,
			transfer_data: {
			destination: 'acct_1NSGHLAcxbsuh4wI',
			},
			confirm: true
		})
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})


const createCheckoutSessionWithoutPayouts = asyncHandler(async (req, res) => { 
	try {
		console.log("chala")
		const session = await stripe.checkout.sessions.create({
	    line_items : [{
			price_data: {
				currency: 'pkr',
				product_data: {
					name: 'Appointment Booking',
					description: 'Appointment Booking',
					images: ["https://img.freepik.com/premium-vector/mental-health-awareness-concept-with-man-wearing-leaves-crown_23-2148530053.jpg"],
				},
				unit_amount: 3000 * 100, 
				},
				quantity: 1,
			}
		],
	    mode: 'payment',
	    success_url: `http://localhost:5173/therapy?success=true`,
	    cancel_url: `http://localhost:5173/therapy?canceled=true`,
	  });


	  res.status(200).json({ sessionId: session.id });

	} catch (error) {
		console.error('Error creating checkout session:', error);
		res.status(500).json({ error: 'Failed to create checkout session' });
	}
});

const createCheckoutSession = asyncHandler(async (req, res) => {
  try {
    const { therapist, date, time, amount } = req.body;
    const patient = req.user._id;

    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: 'pkr',
          product_data: {
            name: 'Appointment Booking',
            description: 'Appointment Booking',
            images: ["https://img.freepik.com/premium-vector/mental-health-awareness-concept-with-man-wearing-leaves-crown_23-2148530053.jpg"],
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      }],
      payment_intent_data: {
        application_fee_amount: 367,
        capture_method: "automatic",
        transfer_data: {
          destination: 'acct_1NSGHLAcxbsuh4wI',
        },
      },
      metadata: {
        therapist,
        date,
        time,
        patient
      },
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `http://localhost:5173/therapy`,
      cancel_url: `http://localhost:5173/therapy`,
    });

    try {
      // Save the appointment to your database
      await Appointment.create({
        patient,
        therapist,
        date,
        time,
      });

      console.log('Appointment booked successfully! withoutwebhook');
    } catch (error) {
      console.error('Error booking appointment:', error);
    }

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

const endpointSecret = process.env.STRIPE_WEBHOOK_KEY;
const webHook = async (req, res) => {
  
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
      console.log("webhookCalled")

    const session = event.data.object;
    const { therapist, date, time, patient } = session.metadata;
    
    try {
      // Save the appointment to your database
      await Appointment.create({
        patient,
        therapist,
        date,
        time,
      });

      console.log('Appointment booked successfully!');
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  }

  res.json({ received: true });
}

export { makePayment, createCheckoutSession, webHook };





