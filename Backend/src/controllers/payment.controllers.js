import { asyncHandler } from "../utils/asyncHandler.js"
import Stripe  from "stripe"
const stripe = Stripe(process.env.STRIPE_SECRET_TEST)


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

export {makePayment};

