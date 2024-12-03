const httpStatus = require('http-status');
const short = require('short-uuid');
const { Contactus } = require('../models');
const ApiError = require('../utils/ApiError');

const translator = short();

/**
 * Create a request
 * @param {Object} requestBody {name,problem,email,mobile,location,needDate,bloodGroup,replacementBloodGroup}
 * @returns {Promise<Contactus>}
 */

const createContactus = async (contactusBody) => {
    contactusBody.id = translator.generate();
  const contactus = await Contactus.create(contactusBody);
  if (!contactus) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Error creating request Campform');
  }
  return contactus;
};

/**
 * Query for requests
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.offset] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const queryContactuss = async (searchKey,filter, options) => {
 // if empty searchKey
  if (searchKey === '') {
    const requests = await Contactus.paginate(filter, options);
    return requests;
  }
  const requests = await Contactus.find({
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
 * @returns {Promise<Contactus>}
 */

const getContactusById = async (id) => {
  const requests = await Contactus.find({
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
 * @returns {Promise<Contactus>}
 */

const updateContactusById = async (contactusId, updateBody) => {
  const request = await getContactusById(contactusId);
  if (!request) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Campform Request not found');
  }

  const updatedContactus = await Contactus.updateOne({ id: contactusId }, updateBody);

  if (!updatedContactus) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Error updating Campform request');
  }

  return updatedContactus;
};

const deleteContactusById = async (contactusId) => {
  const request = await getContactusById(contactusId);
  if (!request) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Campform Request not found');
  }
  const deleteContactus = await Contactus.deleteOne({ id: contactusId });
  if (!deleteCampform) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Error deleting Campform request');
  }
  return deleteContactus;
};

module.exports = {
  createContactus,
  queryContactuss,
  getContactusById,
  updateContactusById,
  deleteContactusById,
};
