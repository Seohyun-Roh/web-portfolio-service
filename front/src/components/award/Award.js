import React, { useState } from 'react';

import AwardCard from './AwardCard';
import AwardEditForm from './AwardEditForm';

function Award({ awardCard, isEditable, handleDeleteClick }) {
  const { title, description, _id } = awardCard;

  const [isEditing, setIsEditing] = useState(false);
  const [award, setAward] = useState({ title, description, _id });

  return (
    <>
      {isEditing ? (
        <AwardEditForm award={award} setAward={setAward} setIsEditing={setIsEditing} />
      ) : (
        <AwardCard award={award} setIsEditing={setIsEditing} isEditable={isEditable} handleDeleteClick={handleDeleteClick} />
      )}
    </>
  );
}

export default Award;
