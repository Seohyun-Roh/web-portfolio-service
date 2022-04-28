import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

function ProjectCard({ project, setIsEditing, isEditable, handleDeleteClick }) {
  const Cleandate = cleanDate => {
    return cleanDate.split('T')[0];
  };
  const CleanFromDate = Cleandate(project.from_date);
  const CleanToDate = Cleandate(project.to_date);

  return (
    <Row className='align-items-center'>
      <Col>
        <Card.Text className='mb-2 mt-3'>{project.title}</Card.Text>
        <Card.Subtitle className='text-muted'>
          {`${project.description}`}
          <br />
          {`${CleanFromDate} ~ ${CleanToDate}`}
        </Card.Subtitle>
      </Col>
      {isEditable && (
        <>
          <Col xs='auto' lg='1'>
            <Button className='mr-3' variant='outline-info' size='sm' style={{ position: 'absolute', right: 60, marginRight: '10px' }} onClick={() => setIsEditing(edit => !edit)}>
              편집
            </Button>
          </Col>
          <Col xs='auto' lg='1'>
            <Button className='mr-3' variant='outline-danger' size='sm' style={{ position: 'absolute', right: 3, marginRight: '10px' }} onClick={() => handleDeleteClick(project._id)}>
              삭제
            </Button>
          </Col>
        </>
      )}
    </Row>
  );
}
export default ProjectCard;
