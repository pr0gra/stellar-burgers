import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  createOrder,
  fetchOrders,
  resetOrder
} from '../../../src/services/slices/ordersSlice';
import {
  RootState,
  useDispatch,
  useSelector
} from '../../../src/services/store';
import { useNavigate } from 'react-router-dom';
import { resetConstructor } from '../../../src/services/slices/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const constructorItems = useSelector((state) => state.burgerConstructor);

  const orderRequest = useSelector((state) => state.orders.creatingOrder);

  const orderModalData = useSelector((state) => state.orders.order);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item: TIngredient) => item._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ingredientIds));
  };
  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(resetConstructor());
    navigate('/');
  };
  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems?.bun?.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
