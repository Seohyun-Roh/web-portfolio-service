import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';

function CertificateCard({ certificate, setIsEditing, isEditable, handleDeleteClick }) {
  const convertDate = date => {
    const seperatedDate = date.split(/T|-/);
    const [year, month, day] = seperatedDate;
    return `${year}-${month}-${day}`;
  };

  return (
    <Row className='align-items-center'>
      <Col>
        <Card.Text className='mb-2 mt-3'>{certificate.title}</Card.Text>
        <Card.Subtitle className='text-muted'>
          {certificate.description}
          <br />
          {convertDate(certificate.when_date)}
        </Card.Subtitle>
      </Col>
      {isEditable && (
        <>
          <Col xs='auto' lg='1'>
            <Button className='mr-3' variant='outline-info' size='sm' style={{ position: 'absolute', right: 60, marginRight: '10px' }} onClick={() => setIsEditing(true)}>
              편집
            </Button>
          </Col>
          <Col xs='auto' lg='1'>
            <Button className='mr-3' variant='outline-danger' size='sm' style={{ position: 'absolute', right: 3, marginRight: '10px' }} onClick={() => handleDeleteClick(certificate._id)}>
              삭제
            </Button>
          </Col>
        </>
      )}
    </Row>
  );
}

export default CertificateCard;
