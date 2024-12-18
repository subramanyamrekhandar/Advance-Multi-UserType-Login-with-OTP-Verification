const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
  authService, userService, tokenService, orgService,  // Assuming orgService exists
} = require('../services');

// Existing user functions
const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const loginViaOtp = catchAsync(async (req, res) => {
  const { otp, mobileOrEmail, role } = req.body;
  const user = await authService.loginUserWithOtp({ otp, mobileOrEmail, role });
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});




module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  loginViaOtp,
  // refreshOrgTokens,
};









































// old code 
// const httpStatus = require('http-status');
// const catchAsync = require('../utils/catchAsync');
// const {
//   authService, userService, tokenService, emailService,
// } = require('../services');

// const register = catchAsync(async (req, res) => {
//   const user = await userService.createUser(req.body);
//   const tokens = await tokenService.generateAuthTokens(user);
//   res.status(httpStatus.CREATED).send({ user, tokens });
// });

// const login = catchAsync(async (req, res) => {
//   const { email, password } = req.body;
//   const user = await authService.loginUserWithEmailAndPassword(email, password);
//   const tokens = await tokenService.generateAuthTokens(user);
//   res.send({ user, tokens });
// });

// const loginViaOtp = catchAsync(async (req, res) => {
//   const { otp, mobileOrEmail } = req.body;
//   const user = await authService.loginUserWithOtp({ otp, mobileOrEmail });
//   const tokens = await tokenService.generateAuthTokens(user);
//   res.send({ user, tokens });
// });

// const logout = catchAsync(async (req, res) => {
//   await authService.logout(req.body.refreshToken);
//   res.status(httpStatus.NO_CONTENT).send();
// });

// const refreshTokens = catchAsync(async (req, res) => {
//   const tokens = await authService.refreshAuth(req.body.refreshToken);
//   res.send({ ...tokens });
// });

// module.exports = {
//   register,
//   login,
//   logout,
//   refreshTokens,
//   loginViaOtp,
// };
