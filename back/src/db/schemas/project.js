import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  from_date: {
    type: Date,
    required: true,
  },
  to_date: {
    type: Date,
    required: true,
  },
});

const ProjectModel = model('Project', ProjectSchema);

export { ProjectModel };
