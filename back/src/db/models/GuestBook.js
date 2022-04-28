import { GuestBookModel } from '../schemas/guestbook';

class GuestBook {
  static async create({ newGuest }) {
    const createdNewGuest = await GuestBookModel.create(newGuest);
    return createdNewGuest;
  }

  static async findById({ guest_id }) {
    const guest = await GuestBookModel.findOne({ _id: guest_id });
    return guest;
  }

  static async findAllByOwnerId({ owner_id }) {
    const guests = await GuestBookModel.find({ owner_id: owner_id });
    return guests;
  }

  static async update({ guest_id, newValues }) {
    const filter = { _id: guest_id };
    const update = { $set: newValues };
    const option = { returnOriginal: false };

    const updatedGuest = await GuestBookModel.findOneAndUpdate(filter, update, option);
    return updatedGuest;
  }

  static async delete({ guest_id }) {
    await GuestBookModel.deleteOne({ _id: guest_id });
    return '삭제가 완료되었습니다.';
  }
}

export { GuestBook };
