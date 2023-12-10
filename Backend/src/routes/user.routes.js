import  express  from "express"
import { authUser, logoutUser, registerPro, registerUser } from "../controllers/user.controller.js"

const router = express.Router()

router.route("/register").post(registerUser) //register
router.route("/applyProfessional").post(registerPro) //register
router.route("/login").post(authUser)   //login
router.route("/logout").post(logoutUser) //logout

export default router;