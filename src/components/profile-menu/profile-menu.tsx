import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logoutApi } from '@api';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApi();
      localStorage.removeItem('refreshToken');
      document.cookie = 'accessToken=; Max-Age=0'; // Удаляем accessToken
      navigate('/login'); // Переход на страницу логина
    } catch (error) {
      console.error('Ошибка при выходе из профиля:', error);
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
