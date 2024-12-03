const express = require('express');
const validate = require('../../middlewares/validate');
const otpValidation = require('../../validations/otp.validation.js');
const otpController = require('../../controllers/otp.controller.js');

const router = express.Router();

/**
 * @swagger
 * /otp:
 *   post:
 *     summary: Send OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                      - mobileOrEmail
 *                  properties:
 *                      mobileOrEmail:
 *                          type: string
 *                          description: mobile number or email
 *                  example:
 *                      mobileOrEmail: 'fake@example.com'
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 */
router
  .route('/')
  .post(validate(otpValidation.sendOtp), otpController.sendOtp);

// /**
//  * @swagger
//  * /otp/verify:
//  *  post:
//  *      summary: Verify OTP
//  *      tags: [Auth]
//  *      requestBody:
//  *          required: true
//  *          content:
//  *              application/json:
//  *                  schema:
//  *                      type: object
//  *                      required:
//  *                          - mobileOrEmail
//  *                          - otp
//  *                      properties:
//  *                        mobileOrEmail:
//  *                          type: string
//  *                          description: mobile number or email
//  *                        otp:
//  *                          type: string
//  *                          description: OTP
//  *                      example:
//  *                          mobileOrEmail: 'fake@example.com'
//  *                          otp: '123456'
//  *      responses:
//  *          '200':
//  *              description: OK
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          type: object
//  *                          example:
//  *                              message: 'OTP verified successfully'
//  */
// router
//     .route('/verify')
//     .post(validate(otpValidation.verifyOtp), otpController.verifyOtp);

module.exports = router;
