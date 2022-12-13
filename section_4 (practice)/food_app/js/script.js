'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const tabs = require('./modules/tabs'),
        timer = require('./modules/timer'),
        modalWindow = require('./modules/modal_window'),
        slider = require('./modules/slider'),
        calCalculator = require('./modules/calories_calculator'),
        card = require('./modules/card'),
        form = require('./modules/form');

  tabs();
  timer();
  modalWindow();
  slider();
  calCalculator();
  card();
  form();

});