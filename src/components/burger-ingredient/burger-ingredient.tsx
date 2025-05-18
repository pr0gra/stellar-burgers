import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../../src/services/store';
import {
  addIngredient,
  setBun
} from '../../../src/services/slices/burgerConstructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count, 'data-cy': dataCy }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        dispatch(setBun(ingredient));
      } else {
        dispatch(addIngredient(ingredient));
      }
    };

    return (
      <BurgerIngredientUI
        data-cy={dataCy}
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
