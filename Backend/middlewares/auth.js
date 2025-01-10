const catchAsyncErrors = require("./catchAsyncErrors.js");
const User = require('../models/userSchema.js'); // Adjusted import
const { ErrorHandler } = require('./error.js');
const jwt = require('jsonwebtoken');

const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.adminToken;
    if (!token) {
        return next(new ErrorHandler("Admin not authenticated", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEYS);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
        return next(new ErrorHandler("User not found", 404));
    }
    if (req.user.role !== "Admin") {
        return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403));
    }
    next();
});

const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
        return next(new ErrorHandler("Patient not authenticated", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEYS);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
        return next(new ErrorHandler("User not found", 404));
    }
    if (req.user.role !== "Patient") {
        return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403));
    }
    next();
});

module.exports = { isAdminAuthenticated, isPatientAuthenticated };
