import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { fetchOrdersHistory } from '../../../src/services/slices/ordersHistorySlice';
import { useDispatch, useSelector } from '../../../src/services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector(
    (state) => state.ordersHistory
  );

  useEffect(() => {
    dispatch(fetchOrdersHistory());
  }, [dispatch]);

  if (loading) {
    return <p>Загрузка заказов...</p>;
  }

  if (error) {
    return <p>Ошибка загрузки заказов: {error}</p>;
  }
  return <ProfileOrdersUI orders={orders} />;
};
