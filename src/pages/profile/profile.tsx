// src/pages/Profile/Profile.tsx

import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { ProfileUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../../src/services/store';
import { updateUser } from '../../../src/services/slices/profileSlice';

export const Profile: FC = () => {
  const dispatch = useDispatch();

  // ✅ Получаем данные профиля из Redux
  const { user, loading, error } = useSelector((state) => state.profile);

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  // ✅ Автоматически заполняем форму, если профиль подгрузился
  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  }, [user]);

  // ✅ Проверяем, изменились ли данные в форме
  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const { name, email, password } = formValue;
    const updatedData = password ? { name, email, password } : { name, email };
    dispatch(updateUser(updatedData));
    setFormValue((prevState) => ({ ...prevState, password: '' }));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  if (loading) {
    return <p>Загрузка профиля...</p>;
  }

  if (error) {
    return <p>Ошибка загрузки профиля: {error}</p>;
  }

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
