import { Schema, model } from 'mongoose';

const LikeSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  like_id: {
    type: String,
    required: true,
  },
});

const LikeModel = model('Like', LikeSchema);

export { LikeModel };
