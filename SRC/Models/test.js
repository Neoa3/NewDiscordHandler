import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: String,
  username: String,
  coins: Number,
});

export default mongoose.model('UserTest', userSchema);