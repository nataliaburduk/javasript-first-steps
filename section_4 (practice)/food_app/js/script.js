require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import timer from './modules/timer';
import modalWindow from './modules/modal_window';
import slider from './modules/slider';
import calCalculator from './modules/calories_calculator';
import card from './modules/card';
import form from './modules/form';
import { openModal } from './modules/modal_window';

document.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = setTimeout(() => (openModal('.modal', modalTimerId)), 50000);

  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  timer('.timer', '2023-01-01');
  modalWindow('[data-modal]', '.modal', modalTimerId);
  slider({
    container: '.offer__slider',
    slide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    previousArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
  });
  calCalculator();
  card();
  form('form', modalTimerId);

});