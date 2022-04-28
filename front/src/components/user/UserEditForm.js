import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import * as Api from '../../api';

function UserEditForm({ user, setIsEditing, setUser }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState('');
  //useState로 confirmPassword 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState('');

  const [userImage, setUserImage] = useState('');
  const navigate = useNavigate();

  const validateEmail = email => {
    return email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4 || password.length === 0;
  const isPasswordSame = password === confirmPassword;
  const isNameValid = name.length >= 2;
  const isFormValid = isEmailValid && isNameValid && isPasswordValid && isPasswordSame;

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      if (window.confirm('정말로 바꿀거에요? ♡⁺◟(●˙▾˙●)◞⁺♡')) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('description', description);
        formData.append('password', password);
        formData.append('image', userImage);

        const { data: updatedUser } = await Api.form_put(`users/${user.id}`, formData);
        setUser(updatedUser);

        setIsEditing(false);
      }
    } catch (error) {
      alert('변경실패...ᕕ(ꐦ°᷄д°᷅)ᕗ', error);
    }
  };

  const deleteUser = async () => {
    try {
      if (window.confirm('정말로 탈퇴하실거에요? (｡•́︿•̀｡)')) {
        await Api.delete('user', user.id);
        navigate(`/login`);
      }
    } catch (error) {
      alert('흐흐! 탈퇴 못하지롱! ψ(｀∇´)ψ', error);
    }
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Label>이름</Form.Label>
            <Form.Control type="text" autoComplete="off" placeholder="이름" value={name} onChange={e => setName(e.target.value)} />
            {!isNameValid && <Form.Text className="text-success">이름은 2글자 이상으로 설정해 주세요.</Form.Text>}
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Label>이메일 주소</Form.Label>
            <Form.Control type="email" autoComplete="off" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} />
            {!isEmailValid && <Form.Text className="text-success">이메일 형식이 올바르지 않습니다.</Form.Text>}
          </Form.Group>

          <Form.Group controlId="userEditDescription">
            <Form.Control type="text" autoComplete="off" placeholder="정보, 인사말" value={description} onChange={e => setDescription(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="userEditImage" className="mb-3">
            <Form.Label>이미지 바꾸기</Form.Label>
            <Form.Control type="file" size="sm" onChange={e => setUserImage(e.target.files[0])} />
          </Form.Group>

          <Form.Group controlId="registerPassword" className="mt-3">
            <Form.Label>새로운 비밀번호</Form.Label>
            <Form.Control type="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)} />
            {!isPasswordValid && <Form.Text className="text-success">비밀번호는 4글자 이상으로 설정해 주세요.</Form.Text>}
          </Form.Group>

          <Form.Group controlId="registerConfirmPassword" className="mt-3">
            <Form.Label>비밀번호 재확인</Form.Label>
            <Form.Control type="password" autoComplete="off" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            {!isPasswordSame && <Form.Text className="text-success">비밀번호가 일치하지 않습니다.</Form.Text>}
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="danger" className="me-3" onClick={() => deleteUser()}>
                회원 탈퇴
              </Button>
              <Button variant="primary" type="submit" className="me-3" disabled={!isFormValid}>
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
