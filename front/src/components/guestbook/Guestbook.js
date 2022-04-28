import React, { useState } from 'react';

import GuestbookCard from './GuestbookCard';
import GuestbookEditForm from './GuestbookEditForm';

function Guestbook({ guestbookCard, isEditable, handleDeleteClick }) {
  const { user_id, user_name, content, _id } = guestbookCard;

  const [isEditing, setIsEditing] = useState(false);
  const [guestbook, setGuestbook] = useState({ user_id, user_name, content, _id });

  return (
    <>
      {isEditing ? (
        <GuestbookEditForm guestbook={guestbook} setGuestbook={setGuestbook} setIsEditing={setIsEditing} />
      ) : (
        <GuestbookCard guestbook={guestbook} setIsEditing={setIsEditing} isEditable={isEditable} handleDeleteClick={handleDeleteClick} />
      )}
    </>
  );
}

export default Guestbook;
