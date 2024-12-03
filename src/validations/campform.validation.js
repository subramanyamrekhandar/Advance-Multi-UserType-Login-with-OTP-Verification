const Joi = require('joi');
const { mobile } = require('./custom.validation');
const createCampform = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
    FirstOrgName: Joi.string(),
    LastOrgName: Joi.string(),
    organizationName: Joi.string(),
    Firstemail: Joi.string().email(),
    Firstphonenumber: Joi.string().required().custom(mobile),
    SecondFirstOrgName: Joi.string(),
    SecondLastOrgName: Joi.string(),
    Secondemail: Joi.string().email(),
    Secondphonenumber: Joi.string().required().custom(mobile),
    CampName: Joi.string(),
    CampAddress: Joi.string().required(),
    EstimationParticipants: Joi.number(),
    EventDate: Joi.string().required(),
    CampSupporter: Joi.string().required(),
    EventStartTime: Joi.string().required(),
    Remarks: Joi.string().required(),

  }),
};

const getCampforms = {
  query: Joi.object().keys({
    searchKey: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCampform = {
  params: Joi.object().keys({
    campformId: Joi.string(),
  }),
};

const updateCampform = {
  params: Joi.object().keys({
    campformId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      userId: Joi.string().required(),
      FirstOrgName: Joi.string(),
      LastOrgName: Joi.string(),
      organizationName: Joi.string(),
      Firstemail: Joi.string().email(),
      Firstphonenumber: Joi.string().required().custom(mobile),
      SecondFirstOrgName: Joi.string(),
      SecondLastOrgName: Joi.string(),
      Secondemail: Joi.string().email(),
      Secondphonenumber: Joi.string().required().custom(mobile),
      CampName: Joi.string(),
      CampAddress: Joi.string().required(),
      EstimationParticipants: Joi.number(),
      EventDate: Joi.string().required(),
      CampSupporter: Joi.string().required(),
      EventStartTime: Joi.string().required(),
      Remarks: Joi.string().required(),
    })
    .min(1),
};

const deleteCampform = {
  params: Joi.object().keys({
    campformId: Joi.string(),
  }),
};

module.exports = {
  createCampform,
  getCampforms,
  getCampform,
  updateCampform,
  deleteCampform,
};
