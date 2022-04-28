import React, { useState } from 'react';

import CommentCard from './CommentCard';
import CommentEditForm from './CommentEditForm';

function Comment({ commentCard, isEditable, handleDeleteClick }) {
  const { user_id, name, content, created_at, _id: id } = commentCard;
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState({ user_id, name, content, created_at, id });

  return (
    <>
      {isEditing ? (
        <CommentEditForm comment={comment} setComment={setComment} setIsEditing={setIsEditing} />
      ) : (
        <CommentCard comment={comment} setIsEditing={setIsEditing} isEditable={isEditable} handleDeleteClick={handleDeleteClick} />
      )}
    </>
  );
}

export default Comment;
