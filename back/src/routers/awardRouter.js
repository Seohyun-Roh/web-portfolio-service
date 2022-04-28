import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { awardService } from '../services/awardService';

const awardRouter = Router();
awardRouter.use(login_required);

awardRouter.post('/award/create', async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
    }

    const { user_id, title, description } = req.body;

    // Add db
    const newAward = await awardService.addAward({
      user_id,
      title,
      description,
    });

    if (newAward.errorMessage) {
      throw new Error(newAward.errorMessage);
    }

    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
});

awardRouter.get('/awards/:id', async (req, res, next) => {
  try {
    const award_id = req.params.id;
    const currentAwardInfo = await awardService.getAwardInfo({ award_id });

    if (currentAwardInfo.errorMessage) {
      throw new Error(currentAwardInfo.errorMessage);
    }

    res.status(200).send(currentAwardInfo);
  } catch (error) {
    next(error);
  }
});

awardRouter.put('/awards/:id', async (req, res, next) => {
  try {
    const award_id = req.params.id;
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;

    const toUpdate = { title, description };

    const updatedAward = await awardService.setAward({ award_id, toUpdate });

    if (updatedAward.errorMessage) {
      throw new Error(updatedAward.errorMessage);
    }

    res.status(200).json(updatedAward);
  } catch (error) {
    next(error);
  }
});

awardRouter.get('/awardlist/:user_id', async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const awards = await awardService.getAwards({ user_id });
    res.status(200).send(awards);
  } catch (error) {
    next(error);
  }
});

awardRouter.delete('/awards/:id', async (req, res, next) => {
  try {
    const award_id = req.params.id;
    const deletedAward = await awardService.deleteAward({ award_id });

    if (deletedAward.errorMessage) {
      throw new Error(deletedAward.errorMessage);
    }

    res.status(200).send(deletedAward);
  } catch (error) {
    next(error);
  }
});

export { awardRouter };
