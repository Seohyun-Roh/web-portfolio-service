import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import * as Api from '../../api';

function EducationAddForm({ portfolioOwnerId, setEducations, setIsAdding }) {
  const [tempEducation, setTempEducation] = useState({
    school: '',
    major: '',
    position: '재학중',
  });

  const handleEducationValue = (name, value) => {
    setTempEducation(prev => ({ ...prev, [name]: value }));
  };

  const positions = ['재학중', '학사졸업', '석사졸업', '박사졸업'];

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await Api.post('education/create', {
        user_id: portfolioOwnerId,
        ...tempEducation,
      });
      setEducations(prev => [...prev, res.data]);
      setIsAdding(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='educationAddSchool' className='mt-3'>
        <Form.Control type='text' placeholder='학교 이름' name='school' value={tempEducation.school} onChange={e => handleEducationValue('school', e.target.value)} />
      </Form.Group>
      <Form.Group controlId='educationAddMajor' className='mt-3'>
        <Form.Control type='text' placeholder='전공' name='major' value={tempEducation.major} onChange={e => handleEducationValue('major', e.target.value)} />
      </Form.Group>

      <div className='mb-3 mt-3'>
        {positions.map((position, idx) => (
          <Form.Check
            inline
            label={position}
            key={idx}
            type='radio'
            name='position'
            value={position}
            checked={tempEducation.position === position}
            onChange={e => handleEducationValue('position', e.target.value)}
          />
        ))}
      </div>

      <Form.Group as={Row} className='mt-3 text-center'>
        <Row>
          <Col sm='20'>
            <Button variant='primary' type='submit' className='me-2'>
              확인
            </Button>
            <Button variant='secondary' type='submit' onClick={() => setIsAdding(false)}>
              취소
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
}

export default EducationAddForm;
