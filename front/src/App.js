import React, { useState, useEffect, useReducer, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './styles/styles.css';

import * as Api from './api';
import { loginReducer } from './reducer';

import Header from './components/Header';
import LoginForm from './components/user/LoginForm';
import Network from './components/user/Network';
import RegisterForm from './components/user/RegisterForm';
import Portfolio from './components/Portfolio';
import Freeboard from './components/freeboard/Freeboard';
import PostAddForm from './components/freeboard/PostAddForm';
import PostView from './components/freeboard/PostView';
import PostEditForm from './components/freeboard/PostEditForm';
import { HeaderSkeleton } from './components/Skeletons';
import Footer from './components/Footer';

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
  // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });

  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const res = await Api.get('user/current');
      const currentUser = res.data;

      // dispatch 함수를 통해 로그인 성공 상태로 만듦.
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: currentUser,
      });
    } catch {
      console.log('%c SessionStorage에 토큰 없음.', 'color: #d93d1a;');
    }
    // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
    setIsFetchCompleted(true);
  };

  // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return <HeaderSkeleton />;
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
        <Router>
          <Header />
          <Routes>
            <Route path='/' exact element={<Portfolio />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/register' element={<RegisterForm />} />
            <Route path='/users/:userId' element={<Portfolio />} />
            <Route path='/network' element={<Network />} />
            <Route path='/freeboard' element={<Freeboard />} />
            <Route path='/freeboard/create' element={<PostAddForm />} />
            <Route path='/freeboard/:postId' element={<PostView />} />
            <Route path='/freeboard/edit/:postId' element={<PostEditForm />} />
            <Route path='*' element={<Portfolio />} />
          </Routes>
          <Footer />
        </Router>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
