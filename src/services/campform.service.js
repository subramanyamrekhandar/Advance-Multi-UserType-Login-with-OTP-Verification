const httpStatus = require('http-status');
const short = require('short-uuid');
const { Campform } = require('../models');
const ApiError = require('../utils/ApiError');

const translator = short();

/**
 * Create a request
 * @param {Object} requestBody {name,problem,email,mobile,location,needDate,bloodGroup,replacementBloodGroup}
 * @returns {Promise<Request>}
 */

const createCampform = async (campformBody) => {
    campformBody.id = translator.generate();
  const campform = await Campform.create(campformBody);
  if (!campform) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Error creating request Campform');
  }
  return campform;
};

/**
 * Query for requests
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.offset] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const queryCampforms = async (searchKey,filter, options) => {
 // if empty searchKey
  if (searchKey === '') {
    const requests = await Campform.paginate(filter, options);
    return requests;
  }
  const requests = await Campform.find({
    $or: [
      { name: { $regex: searchKey, $options: 'i' } },
      // { problem: { $regex: searchKey, $options: 'i' } },
      { email: { $regex: searchKey, $options: 'i' } },
      // { mobile: { $regex: searchKey, $options: 'i' } },
      { location: { $regex: searchKey, $options: 'i' } },
      // { needDate: { $regex: searchKey, $options: 'i' } },
    //   { bloodGroup: { $regex: searchKey, $options: 'i' } },
      // { replacementBloodGroup: { $regex: searchKey, $options: 'i' } }
    ],
    
  });
  const results = [...requests]
  const totalResults = results.length
  const totalPages = Math.ceil(totalResults / options.limit);
  const page = options.page

  return {
    results,
    page,
    limit: options.limit,
    totalPages,
    totalResults
};
}

/**
 * Get request by id
 * @param {ObjectId} id
 * @returns {Promise<Request>}
 */

const getCampformById = async (id) => {
  const requests = await Campform.find({
    id,
  });
  const request = requests[0];
  if (!request) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Campform Request not found');
  }
  return request;
};

/**
 * Update request by id
 * @param {ObjectId} requestId
 * @param {Object} updateBody
 * @returns {Promise<Request>}
 */

const updateCampformById = async (campformId, updateBody) => {
  const request = await getCampformById(campformId);
  if (!request) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Campform Request not found');
  }

  const updatedCampform = await Campform.updateOne({ id: campformId }, updateBody);

  if (!updatedCampform) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Error updating Campform request');
  }

  return updatedCampform;
};

const deleteCampformById = async (campformId) => {
  const request = await getCampformById(campformId);
  if (!request) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Campform Request not found');
  }
  const deleteCampform = await Campform.deleteOne({ id: campformId });
  if (!deleteCampform) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Error deleting Campform request');
  }
  return deleteCampform;
};

module.exports = {
  createCampform,
  queryCampforms,
  getCampformById,
  updateCampformById,
  deleteCampformById,
};
