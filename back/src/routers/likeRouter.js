import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { likeService } from '../services/likeService';

const likeRouter = Router();
likeRouter.use(login_required);

likeRouter.post('/like/create', async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
    }

    const { user_id, like_id } = req.body;

    const newLike = await likeService.addLike({
      user_id,
      like_id,
    });

    if (newLike.errorMessage) {
      throw new Error(newLike.errorMessage);
    }

    res.status(201).json(newLike);
  } catch (error) {
    next(error);
  }
});

// 좋아요 조회 API
likeRouter.get('/likelist/:user_id', async (req, res, next) => {
  try {
    const like_id = req.params.user_id;
    const like = await likeService.getLike({ like_id });

    res.status(200).send(like);
  } catch (error) {
    next(error);
  }
});

likeRouter.delete('/like/delete', async (req, res, next) => {
  try {
    const { user_id, like_id } = req.body;

    const deleteLike = await likeService.deleteLike({
      user_id,
      like_id,
    });

    if (deleteLike.errorMessage) {
      throw new Error(deleteLike.errorMessage);
    }
    res.status(200).send(deleteLike);
  } catch (error) {
    next(error);
  }
});

export { likeRouter };
