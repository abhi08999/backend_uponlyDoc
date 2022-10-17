const {createUser,getUsersInfo,login,createDoctor,DoctorClinic,getAllDoctors} = require("./users.controller");
const router = require("express").Router();
const {checkToken} = require("./auth/token_validation")


router.post("/register",createUser);
router.get("/allDoctor" ,getAllDoctors);
router.post("/login",login)
router.post("/doctor",createDoctor)
router.post("/clinic",checkToken,DoctorClinic)
router.get("/getData/:phone",checkToken,getUsersInfo)

module.exports = router;