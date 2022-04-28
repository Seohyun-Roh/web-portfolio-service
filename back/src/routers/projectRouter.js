import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { projectService } from '../services/projectService';

const projectRouter = Router();
projectRouter.use(login_required);

projectRouter.post('/project/create', async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
    }

    const user_id = req.body.user_id;
    const title = req.body.title;
    const description = req.body.description;
    const from_date = req.body.from_date;
    const to_date = req.body.to_date;

    const newProject = await projectService.addProject({
      user_id,
      title,
      description,
      from_date,
      to_date,
    });

    if (newProject.errorMessage) {
      throw new Error(newProject.errorMessage);
    }

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

projectRouter.get('/projects/:id', async (req, res, next) => {
  try {
    const project_id = req.params.id;
    const currentProjectInfo = await projectService.getProjectInfo({ project_id });

    if (currentProjectInfo.errorMessage) {
      throw new Error(currentProjectInfo.errorMessage);
    }
    res.status(200).send(currentProjectInfo);
  } catch (error) {
    next(error);
  }
});

projectRouter.put('/projects/:id', async (req, res, next) => {
  try {
    const project_id = req.params.id;
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;
    const from_date = req.body.from_date ?? null;
    const to_date = req.body.to_date ?? null;

    const toUpdate = { title, description, from_date, to_date };

    const updatedProject = await projectService.setProject({ project_id, toUpdate });

    if (updatedProject.errorMessage) {
      throw new Error(updatedProject.errorMessage);
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
});

projectRouter.get('/projectlist/:user_id', async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const projects = await projectService.getProjects({ user_id });
    res.status(200).send(projects);
  } catch (error) {
    next(error);
  }
});

// delete 기능 API
projectRouter.delete('/projects/:id', async (req, res, next) => {
  try {
    const project_id = req.params.id;
    const deletedProject = await projectService.deleteProject({ project_id });

    if (deletedProject.errorMessage) {
      throw new Error(deletedProject.errorMessage);
    }

    res.status(200).send(deletedProject);
  } catch (error) {
    next(error);
  }
});

export { projectRouter };
