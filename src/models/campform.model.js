const mongoose = require('mongoose');
const { paginate, toJSON } = require('./plugins');
const campformSchema = new mongoose.Schema(
  {

    FirstOrgName: {
      type: String,
      required: true,
    },
    LastOrgName: {
      type: String,
      required:true
    },
    organizationName: {
      type: String,
      required: true
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
    Firstemail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    Firstphonenumber: {
      type: String,
      required: true,
      unique: true
    },
    SecondFirstOrgName: {
      type: String,
      required: true,
    },
    SecondLastOrgName: {
      type: String,
      required:true
    },
    Secondemail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    Secondphonenumber: {
      type: String,
      required: true,
      unique: true
    },
    CampName: {
        type: String,
        required: true
    },
    CampAddress: {
      type: String,
      required: true
    },
    EstimationParticipants: {
        type: String,
        required: true
      },
    EventDate: {
        type: Date,
        required: true
      },  

    CampSupporter: {
      type: String,
      required: true
    },
    EventStartTime: {
      type: String,
      required: true
    }, 
    Remarks: {
      type: String,
      required: true
    }, 
   

    
  },
  {
    timestamps: true,
  },
);

campformSchema.plugin(paginate);
campformSchema.plugin(toJSON);

campformSchema.index({
  email: 1, mobile: 1, location: 1,
});

const Campform = mongoose.model('Campform', campformSchema);

module.exports = Campform;
