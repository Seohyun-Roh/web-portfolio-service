import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import * as Api from '../../api';

function CommentAddForm({ setComments, cur_user_id, cur_user_name, cur_board_id }) {
  const [tempComment, setTempComment] = useState({ content: '' });

  const handleCommentValue = (name, value) => {
    setTempComment(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (window.confirm(`댓글을 남기시겠습니까?`)) {
        const { data: createdComment } = await Api.post(`freeboard/comment/create`, {
          ...tempComment,
          board_id: cur_board_id,
          user_id: cur_user_id,
          name: cur_user_name,
        });
        setComments(prev => [...prev, createdComment]);
        handleCommentValue('content', '');
      }
    } catch (error) {
      alert('댓글을 남기지 못했습니다.', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className='mt-3'>
      <Form.Group className='mb-3' controlId='commentAdd'>
        <Form.Label>{cur_user_name}</Form.Label>
        <Form.Control as='textarea' rows={3} placeholder='바르고 고운 댓글을 달아주세요 *^~^*' value={tempComment.content} onChange={e => handleCommentValue('content', e.target.value)} />
      </Form.Group>
      <Form.Group className='mt-3 text-center'>
        <Button variant='primary' type='submit' className='me-2'>
          등록
        </Button>
      </Form.Group>
    </Form>
  );
}

export default CommentAddForm;
