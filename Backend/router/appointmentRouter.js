const express = require("express");
const router = express.Router();
const { postAppointment,getAllAppointments, updateAppointmentStatus,deleteAppointment } = require("../controller/appointmentController.js");
const {isAdminAuthenticated, isPatientAuthenticated}= require("../middlewares/auth.js");

router.post("/post",isPatientAuthenticated, postAppointment);
router.get("/getall",isAdminAuthenticated, getAllAppointments);
router.put("/update/:id",isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id",isAdminAuthenticated, deleteAppointment);

module.exports = router;
