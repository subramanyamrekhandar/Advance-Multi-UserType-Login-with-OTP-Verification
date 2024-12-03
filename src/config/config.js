const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000).required().description('http port'),
    JWT_ACCESS_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_REFRESH_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    MONGODB_URL: Joi.string().required().description('Postgres database url'),
    RESEND_API_KEY: Joi.string().description('Resend API key'),
    FROM_EMAIL: Joi.string().description('From email'),
    OTP_SECRET: Joi.string().required().description('OTP secret key'),
    OTP_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which OTP expires'),
    TWILIO_ACCOUNT_SID: Joi.string().required().description('Twilio account SID'),
    TWILIO_AUTH_TOKEN: Joi.string().required().description('Twilio auth token'),
    TWILIO_PHONE_NUMBER: Joi.string().required().description('Twilio phone number'),
  }).unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  dbUrl: envVars.MONGODB_URL,
  jwt: {
    accessSecret: envVars.JWT_ACCESS_SECRET,
    refreshSecret: envVars.JWT_REFRESH_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
  },
  resend: {
    apiKey: envVars.RESEND_API_KEY,
    fromEmail: envVars.FROM_EMAIL,
  },
  otp: {
    secret: envVars.OTP_SECRET,
    expirationMinutes: Number(envVars.OTP_EXPIRATION_MINUTES),
  },
  twilio:{
    accountSID: envVars.TWILIO_ACCOUNT_SID,
    authToken: envVars.TWILIO_AUTH_TOKEN,
    phoneNumber: envVars.TWILIO_PHONE_NUMBER,
  }
};
