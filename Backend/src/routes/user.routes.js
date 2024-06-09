import  express  from "express"
import { authUser, loginUser, logoutUser, refreshAccessToken, registerPro, registerUser,getUser } from "../controllers/user.controller.js"
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

// router.route("/login").post(authUser)   //login
router.route("/login").post(loginUser)   //login
router.route("/refresh-token").post(refreshAccessToken)
router.route("/logout").post(protect,logoutUser) //logout
router.route("/getUser").get(protect,getUser) //logout

export default router;