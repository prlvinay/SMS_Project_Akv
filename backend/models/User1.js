const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'], },
    phone: { type: String, required: true, unique: true , match: [/^\d{10}$/, 'Phone number must be 10 digits'],},
    password: { type: String, required: true },
    status: { type: Number, enum:[0,1,2,99], default: 0 }, // 0: created, 1: active, 2: inactive, 99: deleted
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const User = mongoose.model('User', userSchema);
module.exports = User;


