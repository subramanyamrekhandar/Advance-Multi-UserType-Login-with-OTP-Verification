
//old code 
const Joi = require('joi');

const createOtp = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
    otp: Joi.string().required(),
    channel: Joi.string().required(),
    expiryDate: Joi.string().required(),
  }),
};

const getOtp = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
    mobile: Joi.string(),
    email: Joi.string(),
  //  role: Joi.string().required(),
  }),
};

const verifyOtp = {
  body: {
    otp: Joi.string().required(),
    mobileOrEmail: Joi.string().required(),
    role: Joi.string().required(),
  },
};

const sendOtp = {
  body: {
    mobileOrEmail: Joi.string().required(),
    role: Joi.string().required(),
  },
};

module.exports = {
  createOtp,
  getOtp,
  verifyOtp,
  sendOtp,
};





// const Joi = require('joi');

// // Create OTP validation
// const createOtp = {
//   body: Joi.object().keys({
//     entityId: Joi.string().required(),  // Assuming entityId is used instead of userId
//     channel: Joi.string().required().valid('sms', 'email'),  // Validate allowed channel values
//     expiresAt: Joi.date().required()  // Use date type for expiresAt
//   }),
// };

// // Get OTP validation
// const getOtp = {
//   params: Joi.object().keys({
//     otpId: Joi.string().required()  // Ensure the key matches what is expected in routes, likely otpId
//   }),
// };

// // Verify OTP validation
// const verifyOtp = {
//   body: Joi.object().keys({
//     entityId: Joi.string().required(),  // Using entityId to keep consistent with your model
//     otp: Joi.string().required(),
//     role: Joi.string().required().valid('donor', 'organization')  // Include role validation
//   }),
// };

// // Send OTP validation
// const sendOtp = {
//   body: Joi.object().keys({
//     mobileOrEmail: Joi.string().required(),
//     role: Joi.string().required().valid('donor', 'organization')  // Including role for clarity and to match controller logic
//   }),
// };

// module.exports = {
//   createOtp,
//   getOtp,
//   verifyOtp,
//   sendOtp,
// };


