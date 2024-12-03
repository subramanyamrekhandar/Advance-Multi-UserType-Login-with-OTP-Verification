

//old code 
const mongoose = require('mongoose');

const { Schema } = mongoose;

const otpSchema = new Schema({
  userId: {
    type: Schema.Types.UUID,
    ref: 'User',
    required: true,
    index: true,
   
  },
  otp: {
    type: String,
    required: true,
  },
  channel: {
    type: String,
    enum: ['sms', 'email'],
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt fields
});

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 900 }); // OTP document will auto-delete after 15 minutes

module.exports = mongoose.model('Otp', otpSchema);

