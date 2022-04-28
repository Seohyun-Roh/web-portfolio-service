import React from 'react';
import { Container, Row, Col, Card, Placeholder } from 'react-bootstrap';

export const HeaderSkeleton = () => {
  return (
    <>
      <Placeholder size='lg' animation='glow' style={{ width: '25%', marginLeft: '20px', marginTop: '15px' }} />
      <Placeholder size='lg' animation='glow' style={{ width: '5%', position: 'absolute', right: '9%', marginTop: '15px' }} />
      <Placeholder size='lg' animation='glow' style={{ width: '5%', position: 'absolute', right: '20px', marginTop: '15px' }} />
    </>
  );
};

export const UserSkeleton = () => {
  return (
    <Card className='mb-2 ms-3 mr-5' style={{ width: '18rem' }}>
      <Card.Body>
        <Row className='justify-content-md-center'>
          <Placeholder style={{ width: '10rem', height: '8rem' }} className='mb-3' />
        </Row>
        <Placeholder as={Card.Title} animation='glow'>
          <Placeholder xs={5} size='lg' />
        </Placeholder>
        <Placeholder as={Card.SubTitle} animation='glow' className='mb-2'>
          <Placeholder xs={7} />
        </Placeholder>
        <Placeholder as={Card.Text} animation='glow' className='mb-2'>
          <Placeholder xs={10} size='lg' />
        </Placeholder>
      </Card.Body>
    </Card>
  );
};

export const EducationSkeleton = () => {
  return (
    <Card className='mb-3'>
      <Card.Body>
        <Placeholder as={Card.Title} animation='glow'>
          <Placeholder xs={1} size='lg' />
        </Placeholder>
        <Card.Text>
          <Placeholder as='span' animation='glow'>
            <Placeholder xs={2} size='lg' />
          </Placeholder>
          <br />
          <Placeholder as='span' animation='glow' className='mb-3'>
            <Placeholder xs={1} /> <Placeholder xs={1} />
          </Placeholder>
          <br />
          <Placeholder as='span' animation='glow'>
            <Placeholder xs={2} size='lg' />
          </Placeholder>
          <br />
          <Placeholder as='span' animation='glow'>
            <Placeholder xs={1} /> <Placeholder xs={1} />
          </Placeholder>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export const AwardSkeleton = () => {
  return (
    <Card className='mb-3'>
      <Card.Body>
        <Placeholder as={Card.Title} animation='glow'>
          <Placeholder xs={1} size='lg' />
        </Placeholder>
        <Card.Text>
          <Placeholder as='span' animation='glow'>
            <Placeholder xs={1} size='lg' />
          </Placeholder>
          <br />
          <Placeholder as='span' animation='glow' className='mb-3'>
            <Placeholder xs={2} />
          </Placeholder>
          <br />
          <Placeholder as='span' animation='glow'>
            <Placeholder xs={1} size='lg' />
          </Placeholder>
          <br />
          <Placeholder as='span' animation='glow' className='mb-3'>
            <Placeholder xs={2} />
          </Placeholder>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export const ProjectSkeleton = () => {
  return (
    <Card className='mb-3'>
      <Card.Body>
        <Placeholder as={Card.Title} animation='glow'>
          <Placeholder xs={1} size='lg' />
        </Placeholder>
        <Card.Text>
          <Placeholder as='span' animation='glow'>
            <Placeholder xs={1} size='lg' />
          </Placeholder>
          <br />
          <Placeholder as='span' animation='glow'>
            <Placeholder xs={2} />
          </Placeholder>
          <br />
          <Placeholder as='span' animation='glow' className='mb-3'>
            <Placeholder xs={1} /> <Placeholder xs={1} />
          </Placeholder>
          <br />
          <Placeholder as='span' animation='glow'>
            <Placeholder xs={1} size='lg' />
          </Placeholder>
          <br />
          <Placeholder as='span' animation='glow'>
            <Placeholder xs={2} />
          </Placeholder>
          <br />
          <Placeholder as='span' animation='glow' className='mb-3'>
            <Placeholder xs={1} /> <Placeholder xs={1} />
          </Placeholder>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export const CertificateSkeleton = () => {
  return (
    <Card className='mb-3'>
      <Card.Body>
        <Placeholder as={Card.Title} animation='glow'>
          <Placeholder xs={1} size='lg' />
        </Placeholder>
        <Card.Text>
          <Placeholder as='span' animation='glow'>
            <Placeholder xs={1} size='lg' />
          </Placeholder>
          <br />
          <Placeholder as='span' animation='glow'>
            <Placeholder xs={2} />
          </Placeholder>
          <br />
          <Placeholder as='span' animation='glow' className='mb-3'>
            <Placeholder xs={1} />
          </Placeholder>
          <br />
          <Placeholder as='span' animation='glow'>
            <Placeholder xs={1} size='lg' />
          </Placeholder>
          <br />
          <Placeholder as='span' animation='glow'>
            <Placeholder xs={2} />
          </Placeholder>
          <br />
          <Placeholder as='span' animation='glow'>
            <Placeholder xs={1} />
          </Placeholder>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export const FreeBoardSkeleton = () => {
  return (
    <Card border='light' className='mb-3'>
      <Card.Body className='m-5 p-5'>
        <Placeholder as={Card.Title} animation='glow'>
          <Row>
            <Col>
              <Placeholder xs={2} size='lg' />
            </Col>
            <Col>
              <Placeholder xs={2} size='lg' />
            </Col>
          </Row>
        </Placeholder>
        <Card.Text>
          <Placeholder as='span' animation='glow'>
            <Placeholder xs={12} size='lg' />
          </Placeholder>
          <br />
          <Placeholder as='span' animation='glow'>
            <Placeholder xs={12} />
          </Placeholder>
          <br />
          <Placeholder as='span' animation='glow' className='mb-3'>
            <Placeholder xs={12} />
          </Placeholder>
          <br />
          <Placeholder as='span' animation='glow'>
            <Placeholder xs={12} size='lg' />
          </Placeholder>
          <br />
          <Placeholder as='span' animation='glow'>
            <Placeholder xs={12} />
          </Placeholder>
          <br />
          <Placeholder as='span' animation='glow'>
            <Placeholder xs={12} />
          </Placeholder>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export const PortfolioSkeleton = () => {
  return (
    <Container fluid>
      <Row>
        <Col md='3' lg='3'>
          <UserSkeleton />
        </Col>
        <Col>
          <EducationSkeleton />
          <AwardSkeleton />
          <ProjectSkeleton />
          <CertificateSkeleton />
        </Col>
      </Row>
    </Container>
  );
};

export const NetworkSkeleton = () => {
  return (
    <Container fluid>
      <Row>
        <Col md='3' lg='3'>
          <UserSkeleton />
        </Col>
        <Col md='3' lg='3'>
          <UserSkeleton />
        </Col>
        <Col md='3' lg='3'>
          <UserSkeleton />
        </Col>
        <Col md='3' lg='3'>
          <UserSkeleton />
        </Col>
        <Col md='3' lg='3'>
          <UserSkeleton />
        </Col>
        <Col md='3' lg='3'>
          <UserSkeleton />
        </Col>
      </Row>
    </Container>
  );
};
