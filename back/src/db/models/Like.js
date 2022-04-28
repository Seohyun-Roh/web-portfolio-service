import { LikeModel } from '../schemas/like';

class Like {
  static async create({ newLike }) {
    const createdNewLike = await LikeModel.create(newLike);
    return createdNewLike;
  }

  static async findAllByLikeId({ like_id }) {
    const like = await LikeModel.find({ like_id: like_id });
    return like;
  }

  static async deleteLike({ unlike }) {
    const deletedLike = await LikeModel.deleteMany(unlike);
    return deletedLike;
  }
}

export { Like };
