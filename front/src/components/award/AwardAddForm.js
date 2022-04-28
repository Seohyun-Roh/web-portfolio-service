import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';

function AwardAddForm({ setAwards, portfolioOwnerId, setIsAdding }) {
  const [tempAward, setTempAward] = useState({ title: '', description: '' });

  const handleAwardValue = (name, value) => {
    setTempAward(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await Api.post('award/create', {
        user_id: portfolioOwnerId,
        ...tempAward,
      });
      setAwards(prev => [...prev, res.data]);
      setIsAdding(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className='mt-3'>
      <Form.Group controlId='awardAddTitle'>
        <Form.Control type='text' placeholder='수상내역' value={tempAward.title} onChange={e => handleAwardValue('title', e.target.value)} />
      </Form.Group>

      <Form.Group controlId='awardAddDescription' className='mt-3'>
        <Form.Control type='text' placeholder='상세내역' value={tempAward.description} onChange={e => handleAwardValue('description', e.target.value)} />
      </Form.Group>

      <Form.Group as={Row} className='mt-3 text-center'>
        <Row>
          <Col sm='20'>
            <Button variant='primary' type='submit' className='me-2'>
              확인
            </Button>
            <Button variant='secondary' onClick={() => setIsAdding(false)}>
              취소
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
}

export default AwardAddForm;
