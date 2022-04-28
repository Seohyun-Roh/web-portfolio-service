import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

import Comment from './Comment';
import CommentAddForm from './CommentAddForm';
import * as Api from '../../api';

function Comments({ cur_user_id, cur_user_name, board_id }) {
  const [comments, setComments] = useState([]);

  const handleDeleteClick = async _id => {
    try {
      if (window.confirm('댓글을 삭제하시겠습니까?')) {
        await Api.delete(`freeboard/comments/${_id}`);
        const { data: newComments } = await Api.get(`freeboard/boardcommentlist/${board_id}`);
        setComments(newComments);
      }
    } catch (error) {
      alert('댓글을 삭제하지 못했습니다.', error);
    }
  };

  const loadComments = async () => {
    try {
      const { data: loadedcomments } = await Api.get(`freeboard/boardcommentlist/${board_id}`);
      setComments(loadedcomments);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIsEditable = comment_user_id => {
    if (cur_user_id === comment_user_id) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    loadComments();
  }, [cur_user_id, cur_user_name]);

  return (
    <Card className='mt-3 mb-3'>
      <Card.Body>
        <Card.Title>댓글</Card.Title>
        <CommentAddForm setComments={setComments} cur_user_id={cur_user_id} cur_user_name={cur_user_name} cur_board_id={board_id} />
        {comments.map(comment => {
          return (
            <Card className='mt-3' key={comment._id}>
              <Comment commentCard={comment} isEditable={checkIsEditable(comment.user_id)} handleDeleteClick={handleDeleteClick} />
            </Card>
          );
        })}
      </Card.Body>
    </Card>
  );
}

export default Comments;
