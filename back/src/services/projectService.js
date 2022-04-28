import { Project } from '../db';

class projectService {
  static async addProject({ user_id, title, description, from_date, to_date }) {
    const newProject = { user_id, title, description, from_date, to_date };
    const createdNewProject = await Project.create({ newProject });
    createdNewProject.errorMessage = null;
    return createdNewProject;
  }

  static async getProjects({ user_id }) {
    const projects = await Project.findAllByUserId({ user_id });
    return projects;
  }

  static async setProject({ project_id, toUpdate }) {
    let project = await Project.findById({ project_id });

    if (!project) {
      const errorMessage = '프로젝트 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    if (!toUpdate.title) {
      toUpdate.title = project.title;
    }

    if (!toUpdate.description) {
      toUpdate.description = project.description;
    }

    if (!toUpdate.from_date) {
      toUpdate.from_date = project.from_date;
    }

    if (!toUpdate.to_date) {
      toUpdate.to_date = project.to_date;
    }

    const newValues = {
      title: toUpdate.title,
      description: toUpdate.description,
      from_date: toUpdate.from_date,
      to_date: toUpdate.to_date,
    };

    project = await Project.update({ project_id, newValues });

    return project;
  }

  static async getProjectInfo({ project_id }) {
    const project = await Project.findById({ project_id });

    if (!project) {
      const errorMessage = '해당 프로젝트 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    return project;
  }

  // 삭제
  static async deleteProject({ project_id }) {
    const project = await Project.findById({ project_id });

    if (!project) {
      const errorMessage = '프로젝트 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    const res = await Project.delete({ project_id });

    return res;
  }
}

export { projectService };
