import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  onboardingComplete: {
    type: Boolean,
    default: false
  },
  userType: {
    type: String,
    enum: ['developer', 'designer', 'startup-founder', 'business-owner', 'freelancer', 'agency', 'other'],
  },
  userTypeOther: String,
  primaryGoal: {
    type: String,
    enum: ['buy', 'sell', 'both', 'exploring'],
  },
  skillLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
  },
  targetPlatforms: [String],
  templateInterests: [String],
  preferredTheme: {
    type: String,
    enum: ['light', 'dark', 'both', 'no-preference'],
  },
  designStyle: {
    type: String,
    enum: ['minimalist', 'creative', 'corporate', 'modern'],
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'seller'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get user info without password
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model('User', userSchema, 'user_registration');

export default User; 