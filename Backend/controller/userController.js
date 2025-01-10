const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js');
const { ErrorHandler } = require('../middlewares/error.js');
const {generateToken} = require('../utils/jwtToken.js')
const User = require('../models/userSchema.js');
const cloudinary = require('cloudinary');

const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, gender, dob, nic, role, password } = req.body;

    if (!firstName || !lastName || !email || !phone || !gender || !dob || !nic || !role || !password) {
        return next(new ErrorHandler("Please Fill Full Form", 400));
    }

    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User already registered", 400));
    }

    user = await User.create({
        firstName, lastName, email, phone, gender, dob, nic, role, password
    });
    generateToken(user,"user registered",200,res )
});

const login = catchAsyncErrors(async(req, res, next)=>{
    const{email, password, confirmPassword, role}= req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("Please Provide All details", 400))
    }
    if(password !== confirmPassword ){
        return next(new ErrorHandler("confirm password does not matched", 400)) 
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid credentials", 400)) 
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid credentials", 400)) 
    }
    if(role !== user.role){
        return next(new ErrorHandler("user with this role not found", 400))  
    }
    generateToken(user,"user login successfully", 200,res )
    
})

const addNewAdmin = catchAsyncErrors(async(req, res, next)=>{
    const{
        firstName, lastName, email, phone, gender, dob, nic, password 
    } = req.body;
    
    if (
        !firstName || !lastName || !email || !phone || !gender || !dob || !nic  || !password)
         {
        return next(new ErrorHandler("Please Fill Full Form", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
    return next(new ErrorHandler(`${isRegistered.role} with this email is already exist`));
  }
  const admin = await User.create
  ({ firstName, lastName, email, phone, gender, dob, nic, password, 
  role: "Admin"
    });

  res.status(200).json({
    success: true,
    message: "New Admin Registered",
    
  });

})

const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({
      success: true,
      doctors,
    });
  });
  
const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
  });

//log out function for admin
const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res
      .status(201)
      .cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "Admin Logged Out Successfully.",
      });
  });
  
//logout function for patient
const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res
      .status(201)
      .cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "Patient Logged Out Successfully.",
      });
  });
  
//add new doctor function
const addNewDoctor = catchAsyncErrors(async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length===0){
      return next(new ErrorHandler("Doctor avatar is required", 400))
    }
    const {docAvatar} = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if(!allowedFormats.includes(docAvatar.mimetype)){
      return next(new ErrorHandler("file format not supported", 400))
    }
    const {
      firstName, lastName, email, phone, gender, dob, nic, password, doctorDepartment
    }= req.body;
    if(!firstName|| !lastName|| !email|| !phone|| !gender|| !dob|| !nic|| !password|| !doctorDepartment){
      return next(new ErrorHandler("Please provide all details",400))
    }
    const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(`${isRegistered.role} already registered with this email`,400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
  }
  const doctor = await User.create({
    firstName, lastName, email, phone, gender, dob, nic, password, doctorDepartment, role:"Doctor",docAvatar:{
        public_id: cloudinaryResponse.public_id,
        url:cloudinaryResponse.secure_url
    },
  });
  res.status(200).json({
    success:"true",
    message:"New Doctor Registered",
    doctor
  })
})


module.exports = { patientRegister, login, addNewAdmin, getAllDoctors, getUserDetails, logoutAdmin,logoutPatient,addNewDoctor };
