import { GuestBook } from '../db';

class guestbookService {
  static async addGuest({ owner_id, user_id, user_name, content }) {
    const newGuest = { owner_id, user_id, user_name, content };
    const createdNewGuest = await GuestBook.create({ newGuest });
    createdNewGuest.errorMessage = null;
    return createdNewGuest;
  }

  static async getUserGuests({ owner_id }) {
    const guests = await GuestBook.findAllByOwnerId({ owner_id });
    return guests;
  }

  static async setGuest({ guest_id, toUpdate }) {
    let guest = await GuestBook.findById({ guest_id });

    if (!guest) {
      const errorMessage = '해당 방명록이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    if (!toUpdate.content) {
      toUpdate.content = guest.content;
    }

    const newValues = {
      content: toUpdate.content,
    };

    guest = await GuestBook.update({ guest_id, newValues });
    return guest;
  }

  static async getGuestInfo({ guest_id }) {
    const guest = await GuestBook.findById({ guest_id });

    if (!guest) {
      const errorMessage = '해당 방명록이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    return guest;
  }

  static async deleteGuest({ guest_id }) {
    const guest = await GuestBook.findById({ guest_id });

    if (!guest) {
      const errorMessage = '해당 포스트가 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    const res = await GuestBook.delete({ guest_id });

    return res;
  }
}

export { guestbookService };
