import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import * as Api from '../../api';

function GuestbookAddForm({ setGuestbooks, cur_user_id, cur_user_name, cur_owner_id }) {
  const [tempGuestbook, setTempGuestbook] = useState({ content: '' });

  const handleGuestbookValue = (name, value) => {
    setTempGuestbook(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data: createdGuestbook } = await Api.post(`guestbook/create`, {
        ...tempGuestbook,
        owner_id: cur_owner_id,
        user_id: cur_user_id,
        user_name: cur_user_name,
      });
      setGuestbooks(prev => [...prev, createdGuestbook]);
      handleGuestbookValue('content', '');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className='mt-4'>
      <Form.Group className='mb-3' controlId='commentAdd'>
        <Form.Label>{cur_user_name}</Form.Label>
        <Form.Control as='textarea' rows={3} placeholder='바르고 고운 말을 남겨주세요 *^~^*' value={tempGuestbook.content} onChange={e => handleGuestbookValue('content', e.target.value)} />
      </Form.Group>
      <Form.Group className='mt-3 text-center'>
        <Button variant='primary' type='submit' className='me-2'>
          등록
        </Button>
      </Form.Group>
    </Form>
  );
}

export default GuestbookAddForm;
