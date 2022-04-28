import React, { useEffect } from 'react';
import { ToggleButton } from 'react-bootstrap';

function FollowingButton({ isFollowing, handleFollowChange }) {
  return (
    <ToggleButton className='sm' id='toggle-check' type='checkbox' variant='outline-primary' checked={isFollowing} onClick={() => handleFollowChange(isFollowing)}>
      {isFollowing ? '팔로잉' : '팔로우'}
    </ToggleButton>
  );
}

export default FollowingButton;
