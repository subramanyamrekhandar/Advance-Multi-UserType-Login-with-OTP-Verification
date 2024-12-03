const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const contactusValidation = require('../../validations/contactus.validation');
const contactusController = require('../../controllers/contactus.controller');

const router = express.Router(); 

router
  .route('/')
  .post(auth('createContactus'), validate( contactusValidation.createContactus),  contactusController.createContactus)
  .get(auth('getContactuss'), validate( contactusValidation.getContactuss),  contactusController.getContactuss);

router
  .route('/: contactusId')
  .get(auth('getContactus'), validate( contactusValidation.getContactus),  contactusController.getContactus)
  .patch(auth('updateContactus'), validate( contactusValidation.updateContactus),  contactusController.updateContactus)
  .delete(auth('deleteContactus'), validate( contactusValidation.deleteContactus),  contactusController.deleteContactus);

module.exports = router;