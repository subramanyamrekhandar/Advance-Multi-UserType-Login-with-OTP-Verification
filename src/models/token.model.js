
// old code single user
const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
  blacklisted: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;







// const mongoose = require('mongoose');

// const tokenSchema = new mongoose.Schema({
//   token: {
//     type: String,
//     required: true,
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     refPath: 'entityModel'
//   },
//   // entityId: {
//   //   type: mongoose.Schema.Types.ObjectId,
//   //   required: true,
//   //   refPath: 'entityModel'
//   // },
//   entityModel: {
//     type: String,
//     required: true,
//     default:['user'],
//     enum: ['user', 'organization'],  // This specifies the allowed models for reference
//   },
//   type: {
//     type: String,
//     required: true,
//   },
//   expires: {
//     type: Date,
//     required: true,
//   },
//   blacklisted: {
//     type: Boolean,
//     default: false,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Token = mongoose.model('Token', tokenSchema);

// module.exports = Token;





