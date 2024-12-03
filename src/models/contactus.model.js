const mongoose = require('mongoose');
const { paginate, toJSON } = require('./plugins');
const contactusSchema = new mongoose.Schema(
  {

    FullName: {
      type: String,
      required: true,
    },
    organizationName: {
      type: String,
      required: true
    },
    Category: {
      type: String,
      default: 'Feedback',
      enum: ['Feedback', 'Suggestion', 'Report an Issues'],
    },
    userId: {
      type: String,
      required: true,
      ref: 'User',
    },
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    mobile: {
      type: String,
      required: true,
      unique: true
    },
    Message: {
      type: String,
      required: true,
    },
   

    
  },
  {
    timestamps: true,
  },
);

contactusSchema.plugin(paginate);
contactusSchema.plugin(toJSON);

contactusSchema.index({
  email: 1, mobile: 1, Message: 1,
});

const Contactus = mongoose.model('Contactus', contactusSchema);

module.exports = Contactus;
