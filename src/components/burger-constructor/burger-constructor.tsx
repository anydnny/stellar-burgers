import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useSelector, useDispatch } from '../../services/store';
import {
  getConstructorLoading,
  getConstructorsState
} from '../../services/constructor/slice';
import { fetchOrderBurger } from '../../services/createOrder/action';
import { useNavigate } from 'react-router-dom';
import { clearOrder, getOrder } from '../../services/createOrder/slice';
import { clearIngredients } from '../../services/constructor/slice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getConstructorsState);
  const orderRequest = useSelector(getConstructorLoading);
  const orderModalData = useSelector(getOrder);

  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onOrderClick = () => {
    const { bun, ingredients } = constructorItems;

    if (!isAuth) {
      navigate('/login');
    }

    if (isAuth && !bun) {
      alert('Добавьте булку');
      return;
    } else if (isAuth && ingredients.length === 0) {
      alert('Добавьте ингредиенты');
      return;
    }

    if (isAuth && bun && ingredients.length > 0) {
      const ingredientIds = ingredients.map((item) => item._id);
      const order: string[] = [bun._id, ...ingredientIds, bun._id];
      dispatch(fetchOrderBurger(order));
    }
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearIngredients());
    navigate('/', { replace: true });
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
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
