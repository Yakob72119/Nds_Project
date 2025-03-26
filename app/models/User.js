const mongoose = require('mongoose');

const phoneNumberValidator = {
  validator: function(v) {
    return /^(09|07)\d{8}$/.test(v);
  },
  message: props => `${props.value} is not a valid phone number! Must start with 09 or 07 and be exactly 10 digits`
};

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    validate: phoneNumberValidator
  },
  sponsor: {
    type: String,
    default: 'self-sponsored', // Default value for users without referral
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId, // Refer to the _id of the referring user
    ref: 'User',
    default: null,
  },
  referredUsers: [{
    type: mongoose.Schema.Types.ObjectId, // Array of referred users (User _id)
    ref: 'User',
    default: [],
  }],
  position: {
    type: String,
    required: [true, 'Position is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  referralLink: {
    type: String,
    unique: true,
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
