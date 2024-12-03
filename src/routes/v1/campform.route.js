const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const campformValidation = require('../../validations/campform.validation');
const campformController = require('../../controllers/campform.controller');

const router = express.Router(); 

router
  .route('/')
  .post(auth('createCampform'), validate( campformValidation.createCampform),  campformController.createCampform)
  .get(auth('getCampforms'), validate( campformValidation.getCampforms),  campformController.getCampforms);

router
  .route('/: campformId')
  .get(auth('getCampform'), validate( campformValidation.getCampform),  campformController.getCampform)
  .patch(auth('updateCampform'), validate( campformValidation.updateCampform),  campformController.updateCampform)
  .delete(auth('deleteCampform'), validate( campformValidation.deleteCampform),  campformController.deleteCampform);

module.exports = router;