import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, ToggleButton } from 'react-bootstrap';

import * as Api from '../../api';
import UserCard from './UserCard';
import { UserStateContext } from '../../App';
import { NetworkSkeleton } from '../Skeletons';

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const currUserId = userState.user?.id;
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [followerUsers, setFollowerUsers] = useState([]);
  const [checked, setChecked] = useState('1');
  const [rendingUsers, setRendingUsers] = useState([]);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const radios = [
    { name: '모든 사용자', value: '1' },
    { name: '팔로잉', value: '2' },
    { name: '팔로워', value: '3' },
  ];

  const loadUserList = async () => {
    try {
      const { data: tempAllUsers } = await Api.get('userlist');
      setUsers(tempAllUsers);
      const { data: tempFollowingUsers } = await Api.get(`followinglist/${currUserId}`);
      setFollowingUsers(tempFollowingUsers);
      const { data: tempFollowerUsers } = await Api.get(`followerlist/${currUserId}`);
      setFollowerUsers(tempFollowerUsers);
      setIsFetchCompleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate('/login');
      return;
    }
    loadUserList();
  }, [userState, navigate]);

  useEffect(() => {
    let tempUsers = [];
    if (checked === '1') {
      tempUsers = users;
    } else if (checked === '2') {
      tempUsers = followingUsers.map(followingUser => {
        return users.find(user => user.id === followingUser.following_id);
      });
    } else {
      tempUsers = followerUsers.map(followerUser => {
        return users.find(user => user.id === followerUser.user_id);
      });
    }
    setRendingUsers(tempUsers);
  }, [users, followingUsers, checked]);

  const radioCheck = e => {
    setChecked(e.currentTarget.value);
  };

  if (!isFetchCompleted) {
    return <NetworkSkeleton />;
  }
  return (
    <Container fluid style={{ minHeight: '100vh' }}>
      {radios.map((radio, idx) => (
        <ToggleButton key={idx} id={`radio-${idx}`} type='radio' value={radio.value} className='mb-3 me-1' variant='outline-primary' checked={checked === radio.value} onChange={radioCheck}>
          {radio.name}
        </ToggleButton>
      ))}
      <Row xs='auto' className='jusify-content-center'>
        {rendingUsers.map(user => (
          <UserCard key={user.id} user={user} isNetwork />
        ))}
      </Row>
    </Container>
  );
}

export default Network;
