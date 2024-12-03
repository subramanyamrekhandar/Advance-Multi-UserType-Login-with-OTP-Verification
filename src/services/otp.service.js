
//old code 
const httpStatus = require('http-status');
const cryptojs = require('crypto-js');
const { randomInt } = require('crypto');
const { Otp } = require('../models');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const userService = require('./user.service');


/**
 * Create a otp
 * @param {Object} otpBody {userId,otp,channel,expiryDate}
 * @returns {Promise<Otp>}
 */

const createOtp = async (otpBody) => {
  const existingOtp = await Otp.findOne({ userId: otpBody.userId });

  if (existingOtp) {
    await Otp.findByIdAndDelete(existingOtp.id);
  }
  // lets generate a random 6 digit number using cryptojs

  let otpNum = randomInt(100000, 999999).toString();

  // if environment is development then otp will be 123456

  // if (process.env.NODE_ENV === 'development') {
  //   otpNum = '123456';
  // }

  // now lets encrypt the otp using cryptojs

  const encryptedOtp = cryptojs.AES.encrypt(otpNum, config.otp.secret).toString();

  // otp expiry date is current time + config.otp.expirationMinutes

  otpBody.expiryDate = new Date(new Date().getTime() + config.otp.expirationMinutes * 60 * 1000);

  otpBody.otp = encryptedOtp;

  const otp = await Otp.create(otpBody);
  if (!otp) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Error creating otp');
  }
  if (process.env.NODE_ENV === 'development') {
    return otpNum;
  }
  return otp.toObject();
};

/**
 * Query for otp
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.offset] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const queryOtps = async (options) => {
  return otps.map((otp) => otp.toObject());
};

/**
 * Get otp by id
 * @param {ObjectId} id
 * @returns {Promise<Otp>}
 */

const getOtpById = async (id) => {
  const otp = await Otp.findById({
    id,
  });
  if (!otp) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Otp not found');
  }
  return otp.toObject();
};

/**
 * Get otp by userId
 * @param {string} userId
 * @returns {Promise<Otp>}
 */

const getOtpByUserId = async (userId) => {
  const otp = await Otp.findOne({ userId });
  if (!otp) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Otp not found');
  }
  return otp.toObject();
};

/**
 * Update otp by id
 * @param {ObjectId} otpId
 * @param {Object} updateBody
 * @returns {Promise<Otp>}
 */

const updateOtpById = async (id, updateBody) => {
  const otp = await getOtpById(id);
  if (updateBody.otp) {
    otp.otp = updateBody.otp;
  }
  if (updateBody.channel) {
    otp.channel = updateBody.channel;
  }
  if (updateBody.expiryDate) {
    otp.expiryDate = updateBody.expiryDate;
  }
  await otp.save();
  return otp.toObject();
};

/**
 * Delete otp by id
 * @param {ObjectId} id
 * @returns {Promise<Otp>}
 */

const deleteOtpById = async (id) => {
  const otp = await getOtpById(id);
  await Otp.findByIdAndDelete(id);
  return otp;
};

const getOtpByMobileOrEmail = async (mobileOrEmail, role) => {
  //console.log(mobileOrEmail)
  //console.log(role)

  const mobileRegex = /^[0-9]{10}$/;
  const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  let isEmail = false;
  let user;
  if (mobileRegex.test(mobileOrEmail)) {
    if (role === 'student') {
      user = await userService.getUserBymobile(mobileOrEmail); // Assuming getUserByMobile is the correct function name
      isEmail = false;
    }else if (role === 'admin') {
      user = await userService.getUserBymobile(mobileOrEmail); // Assuming getUserByMobile is the correct function name
      isEmail = false;
    }
  } else if (emailRegex.test(mobileOrEmail)) {
    //console.log(role)
    //console.log(mobileOrEmail)
    if (role === 'student') {
      user = await userService.getUserByEmail(mobileOrEmail);
      isEmail = true;
    }else if (role === 'admin') {
      user = await userService.getUserByEmail(mobileOrEmail);
      isEmail = true;
    }
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid mobile or email');
    
  }

  return user;
  
};

const verifyOtpWithSecret = async (otp, encryptedOtp) => {
  const bytes = cryptojs.AES.decrypt(encryptedOtp, config.otp.secret);
  const originalOtp = bytes.toString(cryptojs.enc.Utf8);
  return otp === originalOtp;
};

const verifyOtp = async ({ mobileOrEmail, otp, role }) => {
  //console.log(mobileOrEmail, otp, role)
  const user = await getOtpByMobileOrEmail(mobileOrEmail, role);
  const otpObj = await getOtpByUserId(user.id);
  console.log(otpObj)
  if (!otpObj) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Otp not found');
  }
  const isOtpValid = await verifyOtpWithSecret(otp, otpObj.otp);
  if (!isOtpValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect otp');
  }
  return otpObj;
};

module.exports = {
  createOtp,
  queryOtps,
  getOtpById,
  getOtpByUserId,
  updateOtpById,
  deleteOtpById,
  getOtpByMobileOrEmail,
  verifyOtp,
};




















