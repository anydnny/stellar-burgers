import { TIngredient } from '@utils-types';
import * as userInfo from '../fixtures/userLogin.json';
import * as orderInfo from '../fixtures/orderResponse.json';

const BUN = `[data-cy=${'643d69a5c3f7b9001cfa093c'}]`;
const MAIN_INGREDIENT = `[data-cy=${'643d69a5c3f7b9001cfa0949'}]`;
const MODAL = '[data-cy="modal"]';
const MODAL_CLOSE = '[data-cy="modalCloseButton"]';
const MODAL_TITLE = '[data-cy="modalIngredientTitle"]';
const MODAL_IMAGE = '[data-cy="modalIngredientImage"]';
const MODAL_CALORIES = '[data-cy="modalIngredientCalories"]';
const MODAL_PROTEINS = '[data-cy="modalIngredienProteins"]';
const MODAL_FAT = '[data-cy="modalIngredientFat"]';
const MODAL_CARB = '[data-cy="modalIngredienCarb"]';
const BURGERCONSTRUCTOR = '[data-cy="constructor"]';

let fetchIngredientsResult: { success: boolean; data: TIngredient[] };
beforeEach(() => {
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
    'fetchIngredients'
  );

  cy.intercept('POST', `api/auth/login`, {
    fixture: 'userLogin.json'
  });

  cy.intercept('GET', `api/auth/user`, {
    fixture: 'user.json'
  });

  cy.intercept('POST', `api/orders`, {
    fixture: 'orderResponse.json'
  });

  cy.visit('/');
  cy.wait('@fetchIngredients');
  cy.fixture('ingredients.json').then((res) => (fetchIngredientsResult = res));
});

describe('Проверка наличия ингредиентов на странице', () => {
  it('Проверка отображения булки', () => {
    cy.get(BUN).should('exist');
  });
  it('Проверка отображения ингредиента', () => {
    cy.get(MAIN_INGREDIENT).should('exist');
  });
});

describe('Проверка модального окна ингредиента', () => {
  it('Открытие модалки', () => {
    cy.get(MODAL).should('not.exist');
    cy.get(MAIN_INGREDIENT).click();
    cy.get(MODAL).should('exist');
  });
  it('Проверка контента модалки', () => {
    cy.get(MAIN_INGREDIENT).click();
    cy.get(MODAL_TITLE).should('contain', fetchIngredientsResult.data[1].name);
    cy.get(MODAL_IMAGE);
    cy.get(MODAL_CALORIES).should(
      'contain',
      fetchIngredientsResult.data[1].calories
    );
    cy.get(MODAL_PROTEINS).should(
      'contain',
      fetchIngredientsResult.data[1].proteins
    );
    cy.get(MODAL_CARB).should(
      'contain',
      fetchIngredientsResult.data[1].carbohydrates
    );
    cy.get(MODAL_FAT).should('contain', fetchIngredientsResult.data[1].fat);
  });
  it('Закрытие модалки по клику', () => {
    cy.get(MAIN_INGREDIENT).click();
    cy.get(MODAL).should('be.visible');
    cy.get(MODAL_CLOSE).click();
    cy.get(MODAL).should('not.exist');
  });
});

describe('Создание заказа', () => {
  beforeEach(() => {
    localStorage.setItem('refreshToken', userInfo.refreshToken);
    cy.setCookie('accessToken', userInfo.accessToken);
    // Проверка что в конструкторе пусто
    cy.get(BURGERCONSTRUCTOR).should(
      'not.contain',
      `${fetchIngredientsResult.data[0].name} (верх)`
    );
    cy.get(BURGERCONSTRUCTOR).should(
      'not.contain',
      `${fetchIngredientsResult.data[0].name} (низ)`
    );
    cy.get(BURGERCONSTRUCTOR).should(
      'not.contain',
      `${fetchIngredientsResult.data[1].name}`
    );
    // Добавление ингредиентов
    cy.get(BUN).children('button').click();
    cy.get(MAIN_INGREDIENT).children('button').click();
  });

  afterEach(() => {
    localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });

  it('Добавление в конструктор', () => {
    // Проверка наличия в конструкторе
    cy.get(BURGERCONSTRUCTOR).should(
      'exist',
      `${fetchIngredientsResult.data[0].name} (верх)`
    );
    cy.get(BURGERCONSTRUCTOR).should(
      'exist',
      `${fetchIngredientsResult.data[0].name} (низ)`
    );
    cy.get(BURGERCONSTRUCTOR).should(
      'exist',
      `${fetchIngredientsResult.data[1].name}`
    );
  });
  it('Оформление заказа и проверка модалки', () => {
    // Проверка что ингредиенты добавились в конструктор
    cy.get(BURGERCONSTRUCTOR).should(
      'exist',
      `${fetchIngredientsResult.data[0].name} (верх)`
    );
    cy.get(BURGERCONSTRUCTOR).should(
      'exist',
      `${fetchIngredientsResult.data[0].name} (низ)`
    );
    cy.get(BURGERCONSTRUCTOR).should(
      'exist',
      `${fetchIngredientsResult.data[1].name}`
    );
    cy.get(BURGERCONSTRUCTOR).contains('Оформить заказ').click();
    cy.get(MODAL).contains(`${orderInfo.order.number}`);
    cy.get(MODAL_CLOSE).click();
    cy.get(MODAL).should('not.exist');
  });
  it('Очистка конструктора', () => {
    cy.get(BURGERCONSTRUCTOR).contains('Оформить заказ').click();
    cy.get(MODAL_CLOSE).click();
    cy.get(BURGERCONSTRUCTOR).should(
      'not.contain',
      `${fetchIngredientsResult.data[0].name} (верх)`
    );
    cy.get(BURGERCONSTRUCTOR).should(
      'not.contain',
      `${fetchIngredientsResult.data[0].name} (низ)`
    );
    cy.get(BURGERCONSTRUCTOR).should(
      'not.contain',
      `${fetchIngredientsResult.data[1].name}`
    );
  });
});
