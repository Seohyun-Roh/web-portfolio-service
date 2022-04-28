import React, { useEffect, useState } from 'react';
import { Card, CardGroup } from 'react-bootstrap';

import Guestbook from './Guestbook';
import GuestbookAddFrom from './GuestbookAddForm';
import * as Api from '../../api';

function Guestbooks({ cur_user_id, cur_user_name, cur_owner_id }) {
  const [guestbooks, setGuestbooks] = useState([]);
  const handleDeleteClick = async _id => {
    try {
      if (window.confirm('방명록을 삭제하시겠습니까?')) {
        await Api.delete(`guestbooks/${_id}`);
        const { data: newGuestbooks } = await Api.get(`guestbooklist/${cur_owner_id}`);
        setGuestbooks(newGuestbooks);
      }
    } catch (error) {
      alert('방명록을 삭제하지 못했습니다.', error);
    }
  };

  const loadGuestbooks = async () => {
    try {
      const { data: loadedGuestbooks } = await Api.get(`guestbooklist/${cur_owner_id}`);
      setGuestbooks(loadedGuestbooks);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIsEditable = guestbook_user_id => {
    if (cur_user_id === guestbook_user_id) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    loadGuestbooks();
  }, [cur_user_id, cur_user_name, cur_owner_id]);

  return (
    <Card className='mt-3 mb-3'>
      <Card.Body>
        <Card.Title>방명록</Card.Title>
        {guestbooks.map(guestbook => {
          return (
            <CardGroup className='pt-1 pb-4' key={guestbook._id}>
              <Card border='light' style={{ width: '18rem' }}>
                <Guestbook guestbookCard={guestbook} isEditable={checkIsEditable(guestbook.user_id)} handleDeleteClick={handleDeleteClick} />
              </Card>
            </CardGroup>
          );
        })}
        <GuestbookAddFrom setGuestbooks={setGuestbooks} cur_user_id={cur_user_id} cur_user_name={cur_user_name} cur_owner_id={cur_owner_id} />
      </Card.Body>
    </Card>
  );
}

export default Guestbooks;
