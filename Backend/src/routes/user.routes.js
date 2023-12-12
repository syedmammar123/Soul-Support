import  express  from "express"
import { authUser, logoutUser, lol, registerPro, registerUser } from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
import { protect } from "../middlewares/auth.middleware.js"


const router = express.Router()

router.route("/register").post(registerUser) //register
router.route("/applyProfessional").post(upload.fields([
        {
            name: "profilePic",
            maxCount: 1
        }, 
        {
            name: "cv",
            maxCount: 1
        }
    ]),registerPro) //register

router.route("/login").post(authUser)   //login
router.route("/logout").post(logoutUser) //logout
router.route("/lol").post(protect,lol) //logout

export default router;