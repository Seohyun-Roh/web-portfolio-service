import React, { useState } from 'react';
import EducationCard from './EducationCard';
import EducationEditForm from './EducationEditForm';

function Education({ education, setEducations, isEditable, handleDeleteClick }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <EducationEditForm currentEducation={education} setEducations={setEducations} setIsEditing={setIsEditing} />
      ) : (
        <EducationCard education={education} isEditable={isEditable} setIsEditing={setIsEditing} handleDeleteClick={handleDeleteClick} />
      )}
    </>
  );
}

export default Education;
