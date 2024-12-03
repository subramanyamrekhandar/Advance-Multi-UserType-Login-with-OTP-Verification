

// oled code 
const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const config = require('../config/config');
const userService = require('./user.service');
const { Token } = require('../models');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.jwt.accessSecret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {string} userId
 * @param {moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token, userId, expires: expires.toDate(), type, blacklisted,

  });
  return tokenDoc;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.accessSecret);
  const tokenDoc = await Token.findOne({
    token, type, userId: payload.sub, blacklisted: false,
  });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);
  await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

/**
 * Generate reset password token
 * @param {string} mobile
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = async (mobile) => {
  const user = await userService.getUserBymobile(mobile);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this mobile');
  }
  const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
  const resetPasswordToken = generateToken(user.id, expires, tokenTypes.RESET_PASSWORD);
  await saveToken(resetPasswordToken, user.id, expires, tokenTypes.RESET_PASSWORD);
  return resetPasswordToken;
};

/**
 * Generate verify email token
 * @param {User} user
 * @returns {Promise<string>}
 */
const generateVerifyEmailToken = async (user) => {
  const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
  const verifyEmailToken = generateToken(user.id, expires, tokenTypes.VERIFY_EMAIL);
  await saveToken(verifyEmailToken, user.id, expires, tokenTypes.VERIFY_EMAIL);
  return verifyEmailToken;
};

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken,
};








// const jwt = require('jsonwebtoken');
// const moment = require('moment');
// const config = require('../config/config');
// const { Token } = require('../models'); // Unified Token model import
// const ApiError = require('../utils/ApiError');
// const httpStatus = require('http-status');
// const { tokenTypes } = require('../config/tokens');
// console.log(tokenTypes);


// /**
//  * Generate token
//  * @param {ObjectId} userId - ID of the user or organization
//  * @param {moment} expires
//  * @param {string} type
//  * @param {boolean} isOrg - Flag to indicate if the entity is an organization
//  * @param {string} [secret]
//  * @returns {string}
//  */
// const generateToken = (userId, expires, type, isOrg = false, secret = config.jwt.accessSecret) => {
//   const payload = {
//     sub: userId,
//     iat: moment().unix(),
//     exp: expires.unix(),
//     type,
//     model: isOrg ? 'organization' : 'user' // Added to payload for clarity in the token itself
//   };
//   return jwt.sign(payload, secret);
// };

// /**
//  * Save a token
//  * @param {string} token
//  * @param {string} userId
//  * @param {moment} expires
//  * @param {string} type
//  * @param {boolean} isOrg
//  * @param {boolean} [blacklisted]
//  * @returns {Promise<Token>}
//  */
// const saveToken = async (token, userId, expires, type, isOrg = false, blacklisted = false) => {
//   const tokenDoc = await Token.create({
//     token,
//     userId,
//     entityModel: isOrg ? 'organization' : 'user',
//     expires: expires.toDate(),
//     type,
//     blacklisted
//   });
//   return tokenDoc;
// };


// const generateAuthTokens = async (userId, isOrg = false) => {
//   console.log(tokenTypes);
//   const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
//   const accessToken = generateToken(userId, accessTokenExpires, tokenTypes.ACCESS, isOrg);

//   const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
//   const refreshToken = generateToken(userId, refreshTokenExpires, tokenTypes.REFRESH, isOrg);
  
//   await saveToken(refreshToken, userId, refreshTokenExpires, tokenTypes.REFRESH, isOrg);

//   return {
//     access: {
//       token: accessToken,
//       expires: accessTokenExpires.toDate(),
//     },
//     refresh: {
//       token: refreshToken,
//       expires: refreshTokenExpires.toDate(),
//     },
//   };
// };


// /**
//  * Verify token and return token doc (or throw an error if it is not valid)
//  * @param {string} token
//  * @param {string} type
//  * @param {boolean} isOrg
//  * @returns {Promise<Token>}
//  */
// const verifyToken = async (token, type, isOrg = false) => {
//   const payload = jwt.verify(token, config.jwt.accessSecret);
//   const tokenDoc = await Token.findOne({
//     token,
//     type,
//     userId: payload.sub,
//     entityModel: isOrg ? 'organization' : 'user',
//     blacklisted: false
//   });
//   if (!tokenDoc) {
//     throw new ApiError('Token not found', httpStatus.UNAUTHORIZED);
//   }
//   return tokenDoc;
// };

// module.exports = {
//   generateToken,
//   generateAuthTokens,
//   saveToken,
//   verifyToken,
// };

































// new v1 code
// const jwt = require('jsonwebtoken');
// const moment = require('moment');
// const httpStatus = require('http-status');
// const config = require('../config/config');
// const userService = require('./user.service');
// const orgService = require('./org.service');
// const { Token, OrgToken } = require('../models');  // Assuming separate models for clarity

// const ApiError = require('../utils/ApiError');
// const { tokenTypes } = require('../config/tokens');

// /**
//  * Generate token
//  * @param {ObjectId} entityId - User or Org ID
//  * @param {moment} expires
//  * @param {string} type
//  * @param {string} [secret]
//  * @param {boolean} isOrg - Flag to determine entity type (user or org)
//  * @returns {string}
//  */
// const generateToken = (entityId, expires, type, isOrg = false, secret = config.jwt.accessSecret) => {
//   const payload = {
//     sub: entityId,
//     iat: moment().unix(),
//     exp: expires.unix(),
//     type,
//   };
//   return jwt.sign(payload, secret);
// };

// /**
//  * Save a token
//  * @param {string} token
//  * @param {string} entityId - User or Org ID
//  * @param {moment} expires
//  * @param {string} type
//  * @param {boolean} isOrg - Flag to determine entity type (user or org)
//  * @param {boolean} [blacklisted]
//  * @returns {Promise<Token|OrgToken>}
//  */
// const saveToken = async (token, entityId, expires, type, isOrg = false, blacklisted = false) => {
//   const model = isOrg ? OrgToken : Token;
//   const tokenDoc = await model.create({
//     token, userId: entityId, expires: expires.toDate(), type, blacklisted,
//   });
//   return tokenDoc;
// };

// /**
//  * Verify token and return token doc (or throw an error if it is not valid)
//  * @param {string} token
//  * @param {string} type
//  * @param {boolean} isOrg - Flag to determine entity type (user or org)
//  * @returns {Promise<Token|OrgToken>}
//  */
// const verifyToken = async (token, type, isOrg = false) => {
//   const payload = jwt.verify(token, config.jwt.accessSecret);
//   const model = isOrg ? OrgToken : Token;
//   const tokenDoc = await model.findOne({
//     token, type, userId: payload.sub, blacklisted: false,
//   });
//   if (!tokenDoc) {
//     throw new ApiError('Token not found', httpStatus.UNAUTHORIZED);
//   }
//   return tokenDoc;
// };

// /**
//  * Generate auth tokens for a user or an organization
//  * @param {User|Organization} entity
//  * @param {boolean} isOrg
//  * @returns {Promise<Object>}
//  */
// const generateAuthTokens = async (entity, isOrg = false) => {
//   const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
//   const accessToken = generateToken(entity.id, accessTokenExpires, tokenTypes.ACCESS, isOrg);

//   const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
//   const refreshToken = generateToken(entity.id, refreshTokenExpires, tokenTypes.REFRESH, isOrg);
//   await saveToken(refreshToken, entity.id, refreshTokenExpires, tokenTypes.REFRESH, isOrg);

//   return {
//     access: {
//       token: accessToken,
//       expires: accessTokenExpires.toDate(),
//     },
//     refresh: {
//       token: refreshToken,
//       expires: refreshTokenExpires.toDate(),
//     },
//   };
// };

// module.exports = {
//   generateToken,
//   saveToken,
//   verifyToken,
//   generateAuthTokens,
// };
















