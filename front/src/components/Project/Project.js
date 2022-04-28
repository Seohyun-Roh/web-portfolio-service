import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectEditForm from './ProjectEditForm';

function Project({ project, setProjects, isEditable, handleDeleteClick }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <ProjectEditForm currentProject={project} setProjects={setProjects} setIsEditing={setIsEditing} />
      ) : (
        <ProjectCard project={project} isEditable={isEditable} setIsEditing={setIsEditing} handleDeleteClick={handleDeleteClick} />
      )}
    </>
  );
}

export default Project;
