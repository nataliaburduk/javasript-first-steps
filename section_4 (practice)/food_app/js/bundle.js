/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calories_calculator.js":
/*!*******************************************!*\
  !*** ./js/modules/calories_calculator.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calCalculator() {
  // Calories calculator

  const resultCal = document.querySelector('.calculating__result span');

  let height, weight, age, sex, ratio;
  // sex = document.querySelector('#gender .calculating__choose-item_active').getAttribute('id'),
  // ratio = document.querySelector('#activity .calculating__choose-item_active').getAttribute('data-ratio');

  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activeClass);
      }

      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
      }
    });
  }

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      resultCal.textContent = '____';
      return;
    }

    if (sex === 'female') {
      resultCal.textContent = Math.floor((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      resultCal.textContent = Math.floor((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  }
  calcTotal();

  console.log(ratio, sex);

  function getStaticInfo(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));
        }
        console.log(ratio, sex);

        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }
  getStaticInfo('#gender div', 'calculating__choose-item_active');
  getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

  function getDynamicInfo(selector) {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {

      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }

      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      calcTotal();
    });
  }

  getDynamicInfo('#height');
  getDynamicInfo('#weight');
  getDynamicInfo('#age');

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calCalculator);

/***/ }),

/***/ "./js/modules/card.js":
/*!****************************!*\
  !*** ./js/modules/card.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function card() {
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;
      this.parent.append(element);
    }
  }

  // getResource('http://localhost:3000/menu')
  // .then(data => {
  //   data.forEach(({img, altimg, title, descr, price}) => {
  //     new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
  //   });
  // });

  axios.get('http://localhost:3000/menu')
    .then(data => {
      data.data.forEach(({
        img,
        altimg,
        title,
        descr,
        price
      }) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
      });
    });



  // class MenuItem {
  //   constructor(img, subtitle, descr, price) {
  //     this.img = img;
  //     this.subtitle = subtitle;
  //     this.descr = descr;
  //     this.price = price;
  //   }
  //   render() {
  //     return `
  //     <div class="menu__item">
  //       <img src="${this.img}" alt="vegy">
  //       <h3 class="menu__item-subtitle">${this.subtitle}</h3>
  //       <div class="menu__item-descr">${this.descr}</div>
  //       <div class="menu__item-divider"></div>
  //       <div class="menu__item-price">
  //         <div class="menu__item-cost">Цена:</div>
  //         <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
  //       </div>
  //     </div>
  //     `;
  //   }
  // }

  // const menuItems = [{
  //     img: "img/tabs/vegy.jpg",
  //     subtitle: 'Меню "Фитнес"',
  //     description: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  //     price: 229
  //   },
  //   {
  //     img: "img/tabs/elite.jpg",
  //     subtitle: 'Меню "Премиум"',
  //     description: 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
  //     price: 550
  //   },
  //   {
  //     img: "img/tabs/post.jpg",
  //     subtitle: 'Меню "Постное"',
  //     description: 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
  //     price: 430
  //   },
  // ];


  // const menuItemsContainer = document.querySelector('#menu-items');

  // menuItems.forEach((itemData) => {
  //   const menuItem = new MenuItem(itemData.img, itemData.subtitle, itemData.description, itemData.price);

  //   menuItemsContainer.innerHTML += menuItem.render();
  // });


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (card);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal_window */ "./js/modules/modal_window.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function form(formSelector, modalTimerId) {
  //AJAX

  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо, мы с вами  свяжемся',
    failure: 'Что-то пошло не так...',
  };

  forms.forEach(item => {
    bindPostData(item);
  });

  

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
          display: block;
          margin: 0 auto;
          `;
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
        .then(data => {
          console.log(data);
          showThanksModal(message.success);
          form.reset();
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {

    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    (0,_modal_window__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);


    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
      <div class="modal__close" data-close>×</div>
      <div class="modal__title">${message}</div>
      </div>
      `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      (0,_modal_window__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
    }, 4000);


  }

  
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/modal_window.js":
/*!************************************!*\
  !*** ./js/modules/modal_window.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
//Modal window
function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  console.log(modalTimerId);
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function modalWindow(triggerSelector, modalSelector, modalTimerId) {
  const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

  
  modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  });
  //toggle

  // modalTrigger.addEventListener('click', ()=> {
  // modal.classList.toggle('show');
  // document.body.style.overflow = 'hidden';
  // });

  // modalClose.addEventListener('click', ()=> {
  // modal.classList.toggle('show');
  // document.body.style.overflow = '';
  // });

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });

  function showModalWindowByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalWindowByScroll);
    }
  }

  window.addEventListener('scroll', showModalWindowByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalWindow);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//Slider
function slider({container, slide, nextArrow, previousArrow, totalCounter, currentCounter,wrapper, field}) {

  function setDefaultStylesForSlides() {
    slidesField.style.width = 100 * sliderElements.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    sliderElements.forEach(slide => {
      slide.style.width = width;
    });
    slider.style.position = 'relative';
  }

  function addCarouselDots() {
    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 15;
          display: flex;
          justify-content: center;
          margin-right: 15%;
          margin-left: 15%;
          list-style: none;
        `;

    slider.append(indicators);

    for (let i = 0; i < sliderElements.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
    `;

      if (i == 0) {
        dot.style.opacity = 1;
      }

      indicators.append(dot);
      dots.push(dot);
    }
  }

  function showCurrentSlide() {
    slidesField.style.transform = `translateX(-${offset}px)`;
    showCurrentIndex();
    highlightSelectedDot();
  }

  function highlightSelectedDot() {
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[indexOfSlides - 1].style.opacity = 1;
  }

  function showCurrentIndex() {
    if (sliderElements.length < 10) {
      current.textContent = `0${indexOfSlides}`;
    } else {
      current.textContent = indexOfSlides;
    }
  }

  function showTotaltIndex() {
    if (sliderElements.length < 10) {
      total.textContent = `0${sliderElements.length}`;
    } else {
      total.textContent = sliderElements.length;
    }
  }

  function widthAsInt() {
    return +width.replace(/\D/g, '');
  }

  let indexOfSlides = 1;
  let offset = 0;
  const dots = [];

  const sliderElements = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    sliderNextBtn = document.querySelector(nextArrow),
    sliderPrevBtn = document.querySelector(previousArrow),
    current = document.querySelector(currentCounter),
    total = document.querySelector(totalCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;

  showTotaltIndex();
  showCurrentIndex();
  setDefaultStylesForSlides();
  addCarouselDots();

  sliderNextBtn.addEventListener('click', () => {
    if (offset == widthAsInt() * (sliderElements.length - 1)) {
      offset = 0;
    } else {
      offset += widthAsInt();
    }


    if (indexOfSlides == sliderElements.length) {
      indexOfSlides = 1;
    } else {
      indexOfSlides++;
    }

    showCurrentSlide();

  });

  sliderPrevBtn.addEventListener('click', () => {
    if (offset == 0) {
      offset = widthAsInt() * (sliderElements.length - 1);
    } else {
      offset -= widthAsInt();
    }


    if (indexOfSlides == 1) {
      indexOfSlides = sliderElements.length;
    } else {
      indexOfSlides--;
    }

    showCurrentSlide();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');
      indexOfSlides = slideTo;
      offset = widthAsInt() * (slideTo - 1);

      showCurrentSlide();

    });
  });


  // showSlides(1);

  // function showSlides(n) {
  //     if (current > sliderElements.length) {
  //         indexOfSlides = 1;
  //     }
  //     if (current < 1) {
  //         indexOfSlides = sliderElements.length;
  //     }



  // //     sliderElements.forEach((item) => {
  // //       item.classList.add('hide');
  // //       item.classList.remove('show');
  // //   });

  // //     sliderElements[indexOfSlides - 1].classList.remove('hide'); 
  // //     sliderElements[indexOfSlides - 1].classList.add('show'); 

  //     if (sliderElements.length < 10) {
  //         current.textContent =  `0${indexOfSlides}`;
  //     } else {
  //         current.textContent =  indexOfSlides;
  //     }
  // }

  // function plusSlides (n) {
  //   showSlides(indexOfSlides += n);
  // }

  // // sliderPrevBtn.addEventListener('click', function(){
  // //   plusSlides(-1);
  // // });

  // // sliderNextBtn.addEventListener('click', function(){
  // //   plusSlides(1);
  // // });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  //Tabs
    const tabs = document.querySelectorAll(tabsSelector),
      tabsContent = document.querySelectorAll(tabsContentSelector),
      tabsParent = document.querySelector(tabsParentSelector);

    function hideTabsContent() {
      tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
      });
      tabs.forEach(item => {
        item.classList.remove(activeClass);
      });
    }

    function showTabsContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add(activeClass);
    }


    hideTabsContent();
    showTabsContent();

    tabsParent.addEventListener('click', (event) => {
      let target = event.target;

      if (target && target.classList.contains(tabsSelector.slice(1))) {
        tabs.forEach((item, i) => {
          if (target === item) {
            hideTabsContent();
            showTabsContent(i);
          }
        });
      }
    });
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//Timer
function timer (id, deadLine) {

  function getTimeRenaming(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60) % 24)),
        minutes = Math.floor((t / 1000 / 60) % 60),
        seconds = Math.floor((t / 1000) % 60);
    }

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRenaming(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(id, deadLine);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });

  return await res.json(); // здесь возвращается промис, мы должны дождаться, пока выполнится первая функция внутри await, а потом дождаться, когда вернутся промис с await
};

async function getResource(url) {
  let res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json(); // здесь возвращается промис, мы должны дождаться, пока выполнится первая функция внутри await, а потом дождаться, когда вернутся промис с await
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal_window */ "./js/modules/modal_window.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calories_calculator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calories_calculator */ "./js/modules/calories_calculator.js");
/* harmony import */ var _modules_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/card */ "./js/modules/card.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");










document.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = setTimeout(() => ((0,_modules_modal_window__WEBPACK_IMPORTED_MODULE_2__.openModal)('.modal', modalTimerId)), 50000);

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])('.timer', '2023-01-01');
  (0,_modules_modal_window__WEBPACK_IMPORTED_MODULE_2__["default"])('[data-modal]', '.modal', modalTimerId);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_3__["default"])({
    container: '.offer__slider',
    slide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    previousArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
  });
  (0,_modules_calories_calculator__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_card__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_modules_form__WEBPACK_IMPORTED_MODULE_6__["default"])('form', modalTimerId);

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map