import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import * as Api from '../../api';

function GuestbookEditForm({ guestbook, setGuestbook, setIsEditing }) {
  const { content, _id } = guestbook;
  const [tempGuestbook, setTempGuestbook] = useState({ content });

  const handleGuestbookValue = (name, value) => {
    setTempGuestbook(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await Api.put(`guestbooks/${_id}`, tempGuestbook);
      setGuestbook(prev => ({
        ...prev,
        ...data,
      }));
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className='mt-3'>
        <Form.Group className='mb-3' controlId='commentAdd'>
          <Form.Label>{guestbook.user_name}</Form.Label>
          <Form.Control as='textarea' rows={3} value={tempGuestbook.content} onChange={e => handleGuestbookValue('content', e.target.value)} />
        </Form.Group>
        <Form.Group className='mt-3 text-center'>
          <Button variant='primary' type='submit' className='me-2'>
            수정
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default GuestbookEditForm;
