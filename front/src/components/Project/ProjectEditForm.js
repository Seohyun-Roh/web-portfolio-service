import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import * as Api from '../../api';
import DatePicker from 'react-datepicker';

function ProjectEditForm({ currentProject, setProjects, setIsEditing }) {
  const [form, setForm] = useState({
    title: currentProject.title,
    description: currentProject.description,
    from_date: new Date(currentProject.from_date),
    to_date: new Date(currentProject.to_date),
  });

  const handleProjectEdit = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (window.confirm(`"${form.title}" 프로젝트를 수정하시겠습니까?`)) {
        await Api.put(`projects/${currentProject._id}`, {
          _id: currentProject._id,
          ...form,
        });
        const { data } = await Api.get('projectlist', currentProject.user_id);
        setProjects(data);
        setIsEditing(false);
      }
    } catch (error) {
      alert(`"${form.title}" 프로젝트를 수정하지 못했습니다.`, error);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='ProjectEditTitle' className='mt-3'>
        <Form.Control type='text' placeholder='프로젝트 이름' name='title' value={form.title} onChange={e => handleProjectEdit(e.target.name, e.target.value)} />
      </Form.Group>
      <Form.Group controlId='ProjectEditMajor' className='mt-3'>
        <Form.Control type='text' placeholder='상세내역' name='description' value={form.description} onChange={e => handleProjectEdit(e.target.name, e.target.value)} />
      </Form.Group>
      <Form.Group as={Row} className='mt-3'>
        <Col xs='auto'>
          <DatePicker selected={form.from_date} name='from_date' dateFormat='yyyy-MM-dd' onChange={date => handleProjectEdit('from_date', date)} />
        </Col>
        <Col xs='auto'>
          <DatePicker selected={form.to_date} name='to_date' dateFormat='yyyy-MM-dd' onChange={date => handleProjectEdit('to_date', date)} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className='mt-3 text-center'>
        <Row>
          <Col sm='20'>
            <Button variant='primary' type='submit' className='me-2'>
              확인
            </Button>
            <Button variant='secondary' type='submit' onClick={() => setIsEditing(false)}>
              취소
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
}

export default ProjectEditForm;
