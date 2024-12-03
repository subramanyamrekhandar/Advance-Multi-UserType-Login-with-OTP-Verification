const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { campformService } = require('../services');

const createCampform = catchAsync(async (req, res) => {
  const request = await campformService.createCampform (req.body);
  res.status(httpStatus.CREATED).send(request);
});

const getCampforms = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const searchKey = req.query.searchKey || '';
  const result = await campformService.queryCampforms(searchKey,filter, options);
  res.send(result);
});

const getCampform   = catchAsync(async (req, res) => {
  const request = await campformService.getCampformById(req.params.campformId);
  if (!request) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Campform Request not found');
  }
  res.send(request);
});

const updateCampform   = catchAsync(async (req, res) => {
  const request = await campformService.updateCampformById(req.params.campformId, req.body);
  res.send(request);
});

const deleteCampform  = catchAsync(async (req, res) => {
  await campformService.deleteCampformById(req.params.campformId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCampform,
  getCampforms,
  getCampform ,
  updateCampform ,
  deleteCampform,
};
