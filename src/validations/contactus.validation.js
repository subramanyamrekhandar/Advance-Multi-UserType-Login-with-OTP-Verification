const Joi = require('joi');
const { mobile } = require('./custom.validation');
const createContactus = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
    FullName: Joi.string(),
    email: Joi.string().email(),
    mobile: Joi.string().required().custom(mobile),
    organizationName: Joi.string(),
    Category: Joi.string().required().valid('Feedback', 'Suggestion', 'Report an Issues'),
    Message: Joi.string().required(),

  }),
};

const getContactuss = {
  query: Joi.object().keys({
    searchKey: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getContactus = {
  params: Joi.object().keys({
    contactusId: Joi.string(),
  }),
};

const updateContactus = {
  params: Joi.object().keys({
    contactusId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      userId: Joi.string().required(),
      FullName: Joi.string(),
      email: Joi.string().email(),
      mobile: Joi.string().required().custom(mobile),
      organizationName: Joi.string(),
      Category: Joi.string().required().valid('Feedback', 'Suggestion', 'Report an Issues'),
      Message: Joi.string().required(),
     
    })
    .min(1),
};

const deleteContactus = {
  params: Joi.object().keys({
    campformId: Joi.string(),
  }),
};

module.exports = {
  createContactus,
  getContactuss,
  getContactus,
  updateContactus,
  deleteContactus,
};
