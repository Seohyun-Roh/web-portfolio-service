import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';
import ProjectAddForm from './ProjectAddForm';
import Project from './Project';
import { ProjectSkeleton } from '../Skeletons';

function Projects({ portfolioOwnerId, isEditable }) {
  const [projects, setProjects] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const handleDeleteClick = async id => {
    try {
      if (window.confirm('프로젝트 항목을 삭제하시겠습니까?')) {
        await Api.delete(`projects/${id}`);
        const res = await Api.get(`projectlist/${portfolioOwnerId}`);
        setProjects(res.data);
      }
    } catch (error) {
      alert('프로젝트 항목을 삭제하지 못했습니다.', error);
    }
  };

  useEffect(() => {
    async function loadProjectList() {
      const res = await Api.get(`projectlist/${portfolioOwnerId}`);
      setProjects(res.data);
      setIsFetchCompleted(true);
    }
    loadProjectList();
  }, [portfolioOwnerId]);

  if (!isFetchCompleted) {
    return <ProjectSkeleton />;
  }

  return (
    <>
      <Card className='mt-3 mb-3'>
        <Card.Body>
          <Card.Title>프로젝트</Card.Title>
          {projects.map(project => (
            <Project key={project._id} project={project} setProjects={setProjects} isEditable={isEditable} handleDeleteClick={handleDeleteClick} />
          ))}
          {isEditable && (
            <Row className='mt-3 text-center mb-4'>
              <Col sm={{ span: 20 }}>
                <Button onClick={() => setIsAdding(true)}>+</Button>
              </Col>
            </Row>
          )}
          {isAdding && <ProjectAddForm portfolioOwnerId={portfolioOwnerId} setProjects={setProjects} setIsAdding={setIsAdding} />}
        </Card.Body>
      </Card>
    </>
  );
}
export default Projects;
