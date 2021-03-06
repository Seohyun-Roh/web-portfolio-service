import { UserModel } from '../schemas/user';

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  static async update({ user_id, newValues }) {
    const filter = { id: user_id };
    const update = { $set: newValues };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  static async delete({ user_id }) {
    await UserModel.deleteOne({ id: user_id });

    return '삭제가 완료 되었습니다.';
  }
}

export { User };
