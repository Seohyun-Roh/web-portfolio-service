import { ProjectModel } from '../schemas/project';

class Project {
  static async create({ newProject }) {
    const createdNewproject = await ProjectModel.create(newProject);
    return createdNewproject;
  }

  static async findById({ project_id }) {
    const project = await ProjectModel.findOne({ _id: project_id });
    return project;
  }

  static async findAllByUserId({ user_id }) {
    const projects = await ProjectModel.find({ user_id: user_id });
    return projects;
  }

  static async update({ project_id, newValues }) {
    const filter = { _id: project_id };
    const update = { $set: newValues };
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(filter, update, option);
    return updatedProject;
  }

  static async delete({ project_id }) {
    await ProjectModel.deleteOne({ _id: project_id });

    return '삭제가 완료 되었습니다.';
  }
}

export { Project };
