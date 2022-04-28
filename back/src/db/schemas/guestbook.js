import { Schema, model, Mongoose } from 'mongoose';

const GuestBookSchema = new Schema({
  owner_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const GuestBookModel = model('GuestBook', GuestBookSchema);

export { GuestBookModel };
