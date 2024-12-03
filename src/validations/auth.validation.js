const Joi = require('joi');
const { mobile, otp } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile: Joi.string().required().custom(mobile),
    location: Joi.string().required(),
    gender: Joi.string().required().valid('male', 'female', 'other'),
  }),
};

const login = {
  body: Joi.object().keys({
    mobile: Joi.string().required(),
    otp: Joi.string().required().custom(otp),
    role: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const loginViaOtp = {
  body: Joi.object().keys({
    mobileOrEmail: Joi.string().required(),
    otp: Joi.string().required().custom(otp),
    role: Joi.string().required(),
    
  }),
};


// const refreshOrgTokens = {
//   body: Joi.object().keys({
//     refreshToken: Joi.string().required(),
//   }),
// };

module.exports = {
  register,
  login,
  refreshTokens,
  loginViaOtp,
 
  // refreshOrgTokens,
};
