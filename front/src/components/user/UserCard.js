import { useNavigate } from 'react-router-dom';
import { Card, Row, Button, Col } from 'react-bootstrap';

import FollowingButton from './FollowingButton';
import LikeButton from './LikeButton';

function UserCard({ user, setIsEditing, isEditable, isNetwork, isFollowing, handleFollowChange, isLiked, handleLikeChange, howManyLiked }) {
  const navigate = useNavigate();
  return (
    <Card className='mb-2 ms-3 mr-5' style={{ width: '18rem' }}>
      <Card.Body>
        <Row className='justify-content-md-center'>
          <Card.Img style={{ width: '10rem', height: '8rem' }} className='mb-3' src={user?.image} alt='프로필 사진' />
        </Row>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>
        {isEditable && (
          <Col>
            <Row className='mt-3 text-info'>
              <Col>
                <Button variant='outline-info' onClick={() => setIsEditing(true)}>
                  편집
                </Button>
              </Col>
              <Col>
                <LikeButton isLiked={isLiked} handleLikeChange={handleLikeChange} howManyLiked={howManyLiked} />
              </Col>
            </Row>
          </Col>
        )}
        {!isNetwork && !isEditable && <FollowingButton isFollowing={isFollowing} handleFollowChange={handleFollowChange} />}
        {!isNetwork && !isEditable && <LikeButton isLiked={isLiked} handleLikeChange={handleLikeChange} howManyLiked={howManyLiked} />}
        {isNetwork && (
          <>
            <Card.Link className='mt-5' href='#' onClick={() => navigate(`/users/${user.id}`)} style={{ position: 'absolute', bottom: 5 }}>
              포트폴리오
            </Card.Link>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
