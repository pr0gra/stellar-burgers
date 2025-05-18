import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './burger-ingredient.module.css';

import {
  Counter,
  CurrencyIcon,
  AddButton,
  Button
} from '@zlden/react-developer-burger-ui-components';

import { TBurgerIngredientUIProps } from './type';

export const BurgerIngredientUI: FC<TBurgerIngredientUIProps> = memo(
  ({ ingredient, count, handleAdd, locationState, 'data-cy': dataCy }) => {
    const { image, price, name, _id } = ingredient;
    return (
      <li className={styles.container}>
        <Link
          data-cy={`${dataCy}.link-${ingredient.name}`}
          className={styles.article}
          to={`/ingredients/${_id}`}
          state={locationState}
        >
          {count && <Counter count={count} />}
          <img className={styles.img} src={image} alt='картинка ингредиента.' />
          <div className={`${styles.cost} mt-2 mb-2`}>
            <p className='text text_type_digits-default mr-2'>{price}</p>
            <CurrencyIcon type='primary' />
          </div>
          <p
            data-cy={`${dataCy}.name`}
            className={`text text_type_main-default ${styles.text}`}
          >
            {name}
          </p>
        </Link>
        <Button
          type='secondary'
          data-cy={`${dataCy}.addButton-${ingredient.name}`}
          onClick={handleAdd}
          extraClass={`${styles.addButton} mt-8`}
          htmlType={'button'}
        >
          Добавить
        </Button>
      </li>
    );
  }
);
