const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const express = require('express');
const validate = require('../../middlewares/validate');

const router = express.Router();

// User routes
router.post('/register', validate(authValidation.register), authController.register);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', authController.refreshTokens);
router.post('/login', validate(authValidation.loginViaOtp), authController.loginViaOtp);


module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register as user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - mobile
 *               - dateOfBirth
 *               - bloodGroup
 *               - lastDonatedDate
 *               - location
 *               - gender
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               mobile:
 *                 type: string
 *                 format: mobile
 *                 description: must be unique
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: date of birth of user
 *               lastDonatedDate:
 *                 type: string
 *                 format: date
 *                 description: last blood donated date of user
 *               bloodGroup:
 *                 type: string
 *                 format: bloodGroup
 *                 description: blood group of user
 *               location:
 *                 type: string
 *                 format: location
 *                 description: location of user
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               mobile: '9876543210'
 *               dateOfBirth: 01-01-1990
 *               lastDonatedDate: 01-01-2020
 *               gender: male
 *               location: fake location
 *               bloodGroup: A+
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateMobile'
 */

/**
 * @swagger
 * /auth/refresh-tokens:
 *   post:
 *     summary: Refresh auth tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *             example:
 *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthTokens'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobileOrEmail
 *               - otp
 *             properties:
 *               mobileOrEmail:
 *                 type: string
 *                 description: use email or phone number
 *               otp:
 *                 type: string
 *                 format: password is the otp sent to the mobile number or email
 *             example:
 *               mobileOrEmail: 'fake@example.com'
 *               otp: '123456'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "401":
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: Invalid email or password
 */
