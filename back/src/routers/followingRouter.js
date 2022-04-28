import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { followingService } from '../services/followingService';

const followingRouter = Router();
followingRouter.use(login_required);

followingRouter.post('/following/create', async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
    }

    const { user_id, following_id } = req.body;

    const newFollowing = await followingService.addFollowing({
      user_id,
      following_id,
    });

    if (newFollowing.errorMessage) {
      throw new Error(newFollowing.errorMessage);
    }

    res.status(201).json(newFollowing);
  } catch (error) {
    next(error);
  }
});

// 모든팔로잉 조회 API
followingRouter.get('/followinglist/:user_id', async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const following = await followingService.getFollowing({ user_id });

    res.status(200).send(following);
  } catch (error) {
    next(error);
  }
});

// 모든팔로워 조회 API
followingRouter.get('/followerlist/:user_id', async (req, res, next) => {
  try {
    const following_id = req.params.user_id;
    const follower = await followingService.getFollower({ following_id });

    res.status(200).send(follower);
  } catch (error) {
    next(error);
  }
});

followingRouter.delete('/following/delete', async (req, res, next) => {
  try {
    const { user_id, following_id } = req.body;

    const deleteFollowing = await followingService.deleteFollowing({
      user_id,
      following_id,
    });

    if (deleteFollowing.errorMessage) {
      throw new Error(deleteFollowing.errorMessage);
    }
    res.status(200).send(deleteFollowing);
  } catch (error) {
    next(error);
  }
});

export { followingRouter };
