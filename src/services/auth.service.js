
//old code 
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const userService = require('./user.service');
const tokenService = require('./token.service');
const otpService = require('./otp.service');


/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  const hash = user.passwordHash;
  if (!hash) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  if (!bcrypt.compareSync(password, hash)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};
/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.userId);
    if (!user) {
      throw new Error({
        message: 'User not found',
        status: httpStatus.NOT_FOUND,
      });
    }
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Login with otp it may be email or mobile
 * @param {string} otp
 * @param {string} channel default is email
 * @param {string} mobileOrEmail
 * @returns {Promise<User>}
 */

const loginUserWithOtp = async ({
  otp,
  channel = 'email',
  mobileOrEmail,
  role,
}) => {
  // lets find out whether it is email or mobile
  // to find we use regex

  const emailRegex = /\S+@\S+\.\S+/;
  const mobileRegex = /^[6-9]\d{9}$/;

  let user;
  if (emailRegex.test(mobileOrEmail)) {
    user = await userService.getUserByEmail(mobileOrEmail);
  } else if (mobileRegex.test(mobileOrEmail)) {
    user = await userService.getUserBymobile(mobileOrEmail);
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Please enter valid email or mobile');
  }

  // lets find out whether otp is valid or not
  await otpService.verifyOtp({
    otp,
    mobileOrEmail,
    role,
  });

  return user;
};

module.exports = {
  loginUserWithEmailAndPassword,
  refreshAuth,
  loginUserWithOtp,

};


