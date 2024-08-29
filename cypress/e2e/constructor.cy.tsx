import { TIngredient } from '@utils-types';
import * as userInfo from '../fixtures/userLogin.json';
import * as orderInfo from '../fixtures/orderResponse.json';

const BUN = `[data-cy=${'643d69a5c3f7b9001cfa093c'}]`;
const MAIN_INGREDIENT = `[data-cy=${'643d69a5c3f7b9001cfa0949'}]`;
const MODAL = '[data-cy="modal"]';
const MODAL_TITLE = '[data-cy="modalIngredientTitle"]';
const MODAL_CLOSE = '[data-cy="modalCloseButton"]';
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
    cy.get(MAIN_INGREDIENT).click();
    cy.get(MODAL).should('exist');
    cy.get(MODAL_TITLE).should('contain', fetchIngredientsResult.data[1].name);
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
