import  express  from "express"

const router = express.Router()

router.post("/register",registerUser) //register
router.post("/applyProfessional",registerPro) //register
router.post("/login",authUser)   //login
router.post("/logout",logoutUser) //logout

export default router;