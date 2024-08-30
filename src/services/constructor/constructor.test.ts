import { expect, test, describe } from '@jest/globals';
import { burgerConstructorReducer } from './slice';
import {
  initialState,
  addIngredient,
  removeIngredient,
  clearIngredients,
  moveDownIngredient,
  moveUpIngredient
} from './slice';
import { INGREDIENTS } from '../../utils/testData';

describe('Тест [reducer] constructor', () => {
  describe('Тест начального стейта', () => {
    test('Тест пустого стейта', () => {
      const result = burgerConstructorReducer(undefined, { type: 'test' });
      expect(result).toEqual(initialState);
    });
  });

  describe('Тест addIngredient', () => {
    const ingredient = { ...INGREDIENTS[1], id: 'randomID' };

    test('Тест добавление ingredient', () => {
      const result = burgerConstructorReducer(
        initialState,
        addIngredient(ingredient)
      );

      expect(result.constructorItems.ingredients[0]).toEqual({
        ...ingredient,
        id: expect.any(String)
      });

      expect(result.constructorItems.ingredients.length).toEqual(1);

      expect(result.constructorItems.bun).toEqual(
        initialState.constructorItems.bun
      );
    });

    test('Тест добавление bun', () => {
      const result = burgerConstructorReducer(
        initialState,
        addIngredient(INGREDIENTS[0])
      );
      expect(result.constructorItems.bun).toEqual({
        ...INGREDIENTS[0],
        id: expect.any(String)
      });
      expect(result.constructorItems.ingredients).toEqual(
        initialState.constructorItems.ingredients
      );
    });
  });

  describe('Тест removeIngredient', () => {
    const ingredient = { ...INGREDIENTS[1], id: '1' };
    const initialStateFake = {
      constructorItems: {
        bun: null,
        ingredients: [ingredient]
      },
      isLoading: false
    };
    test('Удаление ингредиента', () => {
      const result = burgerConstructorReducer(
        initialStateFake,
        removeIngredient(ingredient)
      );
      expect(result.constructorItems.ingredients.length).toBe(0);
    });
  });

  describe('Тест clearIngredients', () => {
    const ingredient = { ...INGREDIENTS[1], id: '1' };
    const bun = { ...INGREDIENTS[0], id: '0' };
    const initialStateFake = {
      constructorItems: {
        bun: bun,
        ingredients: [ingredient]
      },
      isLoading: false
    };
    test('Очистка ингредиентов', () => {
      const result = burgerConstructorReducer(
        initialStateFake,
        clearIngredients()
      );
      expect(result.constructorItems).toEqual(initialState.constructorItems);
    });
  });

  describe('Тест перемещения ингредиента', () => {
    const ingredient1 = { ...INGREDIENTS[1], id: '1' };
    const ingredient2 = { ...INGREDIENTS[1], id: '2' };
    const ingredient3 = { ...INGREDIENTS[1], id: '3' };
    const bun = { ...INGREDIENTS[0], id: '0' };
    const initialStateFake = {
      constructorItems: {
        bun: bun,
        ingredients: [ingredient1, ingredient2, ingredient3]
      },
      isLoading: false
    };
    test('Тест функции moveUpIngredient', () => {
      const result = burgerConstructorReducer(
        initialStateFake,
        moveUpIngredient(1)
      );
      expect(result.constructorItems.ingredients).toEqual([
        ingredient2,
        ingredient1,
        ingredient3
      ]);
    });
    test('Тест функции moveDownIngredient', () => {
      const result = burgerConstructorReducer(
        initialStateFake,
        moveDownIngredient(1)
      );
      expect(result.constructorItems.ingredients).toEqual([
        ingredient1,
        ingredient3,
        ingredient2
      ]);
    });
  });
});
