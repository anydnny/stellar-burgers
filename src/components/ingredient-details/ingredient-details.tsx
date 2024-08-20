import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/ingredients/slice';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const a = useLocation();
  console.log(a);
  const ingredientData = useSelector(selectIngredients).filter(
    (item) => item._id === id
  )[0];

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
