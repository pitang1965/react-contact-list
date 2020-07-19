import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid Credentials') {
      setAlert('メールアドレスまたはパスワードが正しくありません。', 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('下記の情報をすべて入力してください。', 'danger');
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        アカウント <span className='text-primary'>ログイン</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>メールアドレス</label>
          <input
            type='text'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>パスワード</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='ログイン'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
