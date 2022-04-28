import { Award } from '../db';

class awardService {
  static async addAward({ user_id, title, description }) {
    const newAward = { user_id, title, description };
    const createdNewAward = await Award.create({ newAward });
    createdNewAward.errorMessage = null;
    return createdNewAward;
  }

  static async getAwards({ user_id }) {
    const awards = await Award.findAllByUserId({ user_id });
    return awards;
  }

  static async setAward({ award_id, toUpdate }) {
    let award = await Award.findById({ award_id });

    if (!award) {
      const errorMessage = '수상 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    if (!toUpdate.title) {
      toUpdate.title = award.title;
    }
    if (!toUpdate.description) {
      toUpdate.description = award.description;
    }

    const newValues = {
      title: toUpdate.title,
      description: toUpdate.description,
    };

    award = await Award.update({ award_id, newValues });
    return award;
  }

  static async getAwardInfo({ award_id }) {
    const award = await Award.findById({ award_id });

    if (!award) {
      const errorMessage = '해당 수상 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    return award;
  }

  static async deleteAward({ award_id }) {
    const award = await Award.findById({ award_id });

    if (!award) {
      const errorMessage = '삭제할 수상 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    const res = await Award.delete({ award_id });
    return res;
  }
}

export { awardService };
