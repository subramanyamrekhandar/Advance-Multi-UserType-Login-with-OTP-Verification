const mongoose = require('mongoose');
const { paginate, toJSON } = require('./plugins');

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required:true
    },
    lastName: {
      type: String,
      required:true
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female', 'other'],
    },
    role: {
      type: String,
      default: 'student',
      enum: ['student', 'operator', 'admin'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
userSchema.plugin(paginate);
userSchema.plugin(toJSON);

userSchema.index({
  email: 1, mobile: 1, location: 1,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
