import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

import Award from './Award';
import AwardAddForm from './AwardAddForm';
import * as Api from '../../api';
import { AwardSkeleton } from '../Skeletons';

function Awards({ portfolioOwnerId, isEditable }) {
  const [isAdding, setIsAdding] = useState(false);
  const [awards, setAwards] = useState([]);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const handleDeleteClick = async _id => {
    try {
      if (window.confirm('수상이력 항목을 삭제하시겠습니까?')) {
        await Api.delete(`awards/${_id}`);
        const res = await Api.get(`awardlist/${portfolioOwnerId}`);
        setAwards(res.data);
      }
    } catch (error) {
      alert('수상이력 항목을 삭제하지 못했습니다.', error);
    }
  };

  useEffect(() => {
    const loadAwards = async () => {
      try {
        const res = await Api.get(`awardlist/${portfolioOwnerId}`);
        setAwards(res.data);
        setIsFetchCompleted(true);
      } catch (error) {
        console.log(error);
      }
    };
    loadAwards();
  }, [portfolioOwnerId]);

  if (!isFetchCompleted) {
    return <AwardSkeleton />;
  }

  return (
    <>
      <Card className='mt-3 mb-3'>
        <Card.Body>
          <Card.Title>수상이력</Card.Title>
          {awards.map(award => {
            return <Award key={award._id} awardCard={award} isEditable={isEditable} handleDeleteClick={handleDeleteClick} />;
          })}
          {isEditable && (
            <Row className='mt-3 text-center mb-4'>
              <Col sm={{ span: 20 }}>
                <Button onClick={() => setIsAdding(true)}>+</Button>
              </Col>
            </Row>
          )}
          {isAdding && <AwardAddForm setAwards={setAwards} portfolioOwnerId={portfolioOwnerId} setIsAdding={setIsAdding} />}
        </Card.Body>
      </Card>
    </>
  );
}

export default Awards;
