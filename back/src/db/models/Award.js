import { AwardModel } from '../schemas/award';

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async findById({ award_id }) {
    const award = await AwardModel.findOne({ _id: award_id });
    return award;
  }

  static async findAllByUserId({ user_id }) {
    const awards = await AwardModel.find({ user_id: user_id });
    return awards;
  }

  static async update({ award_id, newValues }) {
    const filter = { _id: award_id };
    const update = { $set: newValues };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(filter, update, option);
    return updatedAward;
  }

  static async delete({ award_id }) {
    await AwardModel.deleteOne({ _id: award_id });
    return '삭제가 완료 되었습니다.';
  }
}

export { Award };
