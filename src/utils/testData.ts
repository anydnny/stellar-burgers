import { TOrder } from '@utils-types';

export const FEEDS: TOrder[] = [
  {
    _id: '66cf864c119d45001b502b8b',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa093f',
      '643d69a5c3f7b9001cfa093f',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Краторный бессмертный бургер',
    createdAt: '2024-08-28T20:19:24.104Z',
    updatedAt: '2024-08-28T20:19:24.910Z',
    number: 51442
  },
  {
    _id: '66cf7de1119d45001b502b6b',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0946',
      '643d69a5c3f7b9001cfa094a',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Минеральный астероидный флюоресцентный spicy бургер',
    createdAt: '2024-08-28T19:43:29.558Z',
    updatedAt: '2024-08-28T19:43:30.769Z',
    number: 51433
  },
  {
    _id: '66cf68e0119d45001b502aea',
    ingredients: ['643d69a5c3f7b9001cfa0948', '643d69a5c3f7b9001cfa0947'],
    status: 'done',
    name: 'Альфа-сахаридный фалленианский бургер',
    createdAt: '2024-08-28T18:13:52.441Z',
    updatedAt: '2024-08-28T18:13:52.930Z',
    number: 51403
  }
];

export const INGREDIENTS = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0949',
    name: 'Мини-салат Экзо-Плантаго',
    type: 'main',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 6,
    price: 4400,
    image: 'https://code.s3.yandex.net/react/code/salad.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
    __v: 0
  }
];
