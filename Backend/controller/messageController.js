const Message = require('../models/messageSchema.js'); // Import directly
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js');
const { ErrorHandler } = require('../middlewares/error.js'); // Adjusted import

const sendMessage = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, message } = req.body;
    if (!firstName || !lastName || !email || !phone || !message) {
        return next(ErrorHandler("Please Fill Full Form!", 400)); // Corrected usage
    }
    await Message.create({ firstName, lastName, email, phone, message });
    res.status(200).json({
        success: true,
        message: "Message Sent successfully!",
    });
});

const getAllMessages = catchAsyncErrors(async (req, res, next) => {
    const messages = await Message.find();
    res.status(200).json({
        success: true,
        messages,
    });
});




module.exports = { sendMessage, getAllMessages };
