import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { guestbookService } from '../services/guestbookService';

const guestbookRouter = Router();
guestbookRouter.use(login_required);

guestbookRouter.post('/guestbook/create', async (req, res, next) => {
  try {
    const { owner_id, user_id, user_name, content } = req.body;

    const newGuest = await guestbookService.addGuest({
      owner_id,
      user_id,
      user_name,
      content,
    });

    if (newGuest.errorMessage) {
      throw new Error(newGuest.errorMessage);
    }

    res.status(201).json(newGuest);
  } catch (error) {
    next(error);
  }
});

guestbookRouter.get('/guestbooks/:id', async (req, res, next) => {
  try {
    const guest_id = req.params.id;
    const currentGuestInfo = await guestbookService.getGuestInfo({ guest_id });

    if (currentGuestInfo.errorMessage) {
      throw new Error(currentGuestInfo.errorMessage);
    }

    res.status(200).send(currentGuestInfo);
  } catch (error) {
    next(error);
  }
});

guestbookRouter.put('/guestbooks/:id', async (req, res, next) => {
  try {
    const guest_id = req.params.id;
    const content = req.body.content ?? null;

    const toUpdate = { content };

    const updatedGuest = await guestbookService.setGuest({ guest_id, toUpdate });

    if (updatedGuest.errorMessage) {
      throw new Error(updatedGuest.errorMessage);
    }

    res.status(200).json(updatedGuest);
  } catch (error) {
    next(error);
  }
});

guestbookRouter.get('/guestbooklist/:owner_id', async (req, res, next) => {
  try {
    const owner_id = req.params.owner_id;
    const guests = await guestbookService.getUserGuests({ owner_id });
    res.status(200).send(guests);
  } catch (error) {
    next(error);
  }
});

guestbookRouter.delete('/guestbooks/:id', async (req, res, next) => {
  try {
    const guest_id = req.params.id;
    const deletedGuest = await guestbookService.deleteGuest({ guest_id });

    if (deletedGuest.errorMessage) {
      throw new Error(deletedGuest.errorMessage);
    }

    res.status(200).send(deletedGuest);
  } catch (error) {
    next(error);
  }
});

export { guestbookRouter };
