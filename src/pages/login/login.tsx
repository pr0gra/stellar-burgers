import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useNavigate } from 'react-router-dom';
import { loginUserApi } from '@api';
import { setCookie } from '../../../src/utils/cookie';
import { useDispatch } from '../../../src/services/store';
import { checkAuth } from '../../../src/services/slices/profileSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await loginUserApi({ email, password });
      if (response.success) {
        setCookie('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        navigate('/');
        dispatch(checkAuth());
      }
    } catch (error: any) {
      setErrorText(error.message || 'Произошла ошибка при входе');
    }
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
