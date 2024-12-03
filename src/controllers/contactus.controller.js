const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { contactusService } = require('../services');

const createContactus = catchAsync(async (req, res) => {
  const request = await contactusService.createContactus (req.body);
  res.status(httpStatus.CREATED).send(request);
});

const getContactuss = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const searchKey = req.query.searchKey || '';
  const result = await contactusService.queryContactuss(searchKey,filter, options);
  res.send(result);
});

const getContactus   = catchAsync(async (req, res) => {
  const request = await contactusService.getContactusById(req.params.contactusId);
  if (!request) {
    throw new ApiError(httpStatus.NOT_FOUND, 'contactus Request not found');
  }
  res.send(request);
});

const updateContactus   = catchAsync(async (req, res) => {
  const request = await contactusService.updateContactusById(req.params.contactusId, req.body);
  res.send(request);
});

const deleteContactus  = catchAsync(async (req, res) => {
  await contactusService.deleteContactusById(req.params.contactusId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createContactus,
  getContactuss,
  getContactus ,
  updateContactus,
  deleteContactus,
};
