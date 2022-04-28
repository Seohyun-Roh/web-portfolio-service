import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';

function AwardEditForm({ award, setAward, setIsEditing }) {
  const { title, description, _id } = award;
  const [tempAward, setTempAward] = useState({ title, description });

  const handleAwardValue = (name, value) => {
    setTempAward(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (window.confirm(`"${tempAward.title}" 수상이력을 수정하시겠습니까?`)) {
        const { data } = await Api.put(`awards/${_id}`, tempAward);
        setAward(prev => ({
          ...prev,
          ...data,
        }));
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='awardEditTitle' className='mt-3'>
          <Form.Control type='text' placeholder='수상내역' value={tempAward.title} onChange={e => handleAwardValue('title', e.target.value)} />
        </Form.Group>

        <Form.Group controlId='awardEditDescription' className='mt-3'>
          <Form.Control type='text' placeholder='상세내역' value={tempAward.description} onChange={e => handleAwardValue('description', e.target.value)} />
        </Form.Group>

        <Form.Group as={Row} className='mt-3 text-center'>
          <Row>
            <Col sm='20'>
              <Button variant='primary' type='submit' className='me-2'>
                확인
              </Button>
              <Button variant='secondary' onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </>
  );
}

export default AwardEditForm;
