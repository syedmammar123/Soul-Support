import  express  from "express"
import { getProfessionals } from "../controllers/professional.controllers.js"
import { protect } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.route("/getPro").get(protect,getProfessionals) //logout

export default router;