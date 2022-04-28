import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import * as Api from '../../api';

function CertificateEditForm({ certificate, setCertificate, setIsEditing }) {
  const { _id, title, description, when_date } = certificate;

  const [tempCertificate, setTempCertificate] = useState({ title, description, when_date: new Date(when_date) });

  const handleCertificateValue = (name, value) => {
    setTempCertificate(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      if (window.confirm(`"${tempCertificate.title}" 자격증 항목을 수정하시겠습니까?`)) {
        const res = await Api.put(`certificates/${_id}`, tempCertificate);
        setCertificate(res.data);
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='certificateEditTitle' className='mt-3'>
        <Form.Control type='text' placeholder='자격증 제목' value={tempCertificate.title} onChange={e => handleCertificateValue('title', e.target.value)} />
      </Form.Group>

      <Form.Group controlId='certificateEditDescription' className='mt-3'>
        <Form.Control type='text' placeholder='상세내역' value={tempCertificate.description} onChange={e => handleCertificateValue('description', e.target.value)} />
      </Form.Group>

      <Form.Group controlId='certificateEditDate' className='mb-3 mt-3'>
        <DatePicker selected={tempCertificate.when_date} dateFormat='yyyy/MM/dd' onChange={date => handleCertificateValue('when_date', date)} />
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
  );
}

export default CertificateEditForm;
