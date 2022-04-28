import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';
import Education from './Education';
import EducationAddForm from './EducationAddForm';
import { EducationSkeleton } from '../Skeletons';

function Educations({ portfolioOwnerId, isEditable }) {
  const [educations, setEducations] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const handleDeleteClick = async id => {
    try {
      if (window.confirm('학력을 삭제하시겠습니까?')) {
        await Api.delete(`educations/${id}`);
        const res = await Api.get(`educationlist/${portfolioOwnerId}`);
        setEducations(res.data);
      }
    } catch (error) {
      alert('학력을 삭제하지 못했습니다.', error);
    }
  };

  useEffect(() => {
    async function loadEducationList() {
      const res = await Api.get(`educationlist/${portfolioOwnerId}`);
      setEducations(res.data);
      setIsFetchCompleted(true);
    }
    loadEducationList();
  }, [portfolioOwnerId]);

  if (!isFetchCompleted) {
    return <EducationSkeleton />;
  }

  return (
    <>
      <Card className='mb-3'>
        <Card.Body>
          <Card.Title>학력</Card.Title>
          {educations.map(education => (
            <Education key={education._id} education={education} setEducations={setEducations} isEditable={isEditable} handleDeleteClick={handleDeleteClick} />
          ))}

          {isEditable && (
            <Row className='mt-3 text-center mb-4'>
              <Col sm='20'>
                <Button onClick={() => setIsAdding(true)}>+</Button>
              </Col>
            </Row>
          )}

          {isAdding && <EducationAddForm portfolioOwnerId={portfolioOwnerId} setEducations={setEducations} setIsAdding={setIsAdding} />}
        </Card.Body>
      </Card>
    </>
  );
}
export default Educations;
