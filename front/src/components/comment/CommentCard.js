import React from 'react';
import { Container, Button, Card, Col, Row } from 'react-bootstrap';
import moment from 'moment';

function CommentCard({ comment, setIsEditing, isEditable, handleDeleteClick }) {
  return (
    <>
      <Row>
        <Card.Text className='m-2'>{comment.name}</Card.Text>
        <Card.Subtitle className='text-muted m-2'>{comment.content}</Card.Subtitle>
      </Row>
      {isEditable && (
        <>
          <Container style={{ position: 'relative' }}>
            <Row className='mb-3'>
              <Col xs lg='1'>
                <Button variant='outline-info' size='sm' className='mt-2' onClick={() => setIsEditing(true)}>
                  편집
                </Button>
              </Col>
              <Col xs lg='1'>
                <Button variant='outline-danger' style={{ position: 'absolute', right: 8 }} size='sm' className='mt-2' onClick={() => handleDeleteClick(comment.id)}>
                  삭제
                </Button>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default CommentCard;
