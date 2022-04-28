import { Schema, model } from 'mongoose';

const FollowingSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  following_id: {
    type: String,
    required: true,
  },
});

const FollowingModel = model('Following', FollowingSchema);

export { FollowingModel };
