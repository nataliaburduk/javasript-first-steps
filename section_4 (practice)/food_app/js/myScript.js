'use strict';

//Tabs

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

  function hideTabsContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabsContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }


  hideTabsContent();
  showTabsContent();

  tabsParent.addEventListener('click', (event) => {
    let target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target === item) {
          hideTabsContent();
          showTabsContent(i);
        }
      });
    }
  });


  //Timer

  const deadLine = '2022-11-08';

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

  setClock('.timer', deadLine);


  //Modal window

  //show, hide

  const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal');

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }

  modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
  });


  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

 

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
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 50000);

  function showModalWindowByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal();
      window.removeEventListener('scroll', showModalWindowByScroll);
    }
  }

  window.addEventListener('scroll', showModalWindowByScroll);

  //AJAX

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо, мы с вами  свяжемся',
    failure: 'Что-то пошло не так...',
  };

  forms.forEach(item => {
    bindPostData(item);
  });

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

      postData('http://localhost:3000/requests', json)
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
    openModal();
  

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
      closeModal();
    }, 4000);

  
  }

});

const getResource = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json(); // здесь возвращается промис, мы должны дождаться, пока выполнится первая функция внутри await, а потом дождаться, когда вернутся промис с await
};


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
    data.data.forEach(({img, altimg, title, descr, price}) => {
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


// fetch('http://localhost:3000/menu')
//   .then(data => data.json())
//   .then(res => console.log(res));



//Slider

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

  for (let i = 0; i < sliderElements.length; i++){
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
      
    if(i == 0) {
      dot.style.opacity = 1;
    }
      
    indicators.append(dot);
    dots.push(dot);
  }
}

function showCurrentSlide(){
  slidesField.style.transform = `translateX(-${offset}px)`;
  showCurrentIndex();
  highlightSelectedDot();
}

function highlightSelectedDot() {
  dots.forEach(dot => dot.style.opacity = '.5');
  dots[indexOfSlides - 1].style.opacity = 1;
}

function showCurrentIndex() {
  if (sliderElements.length < 10){
    current.textContent = `0${indexOfSlides}`;
  } else {
    current.textContent =  indexOfSlides;
  }
}

function showTotaltIndex() {
  if (sliderElements.length < 10) {
    total.textContent =  `0${sliderElements.length}`;
  } else {
    total.textContent =  sliderElements.length;
  }
}

function widthAsInt() {
  return +width.replace(/\D/g, '');
}

let indexOfSlides = 1;
let offset = 0;
const dots = [];

const sliderElements = document.querySelectorAll('.offer__slide'),
      slider = document.querySelector('.offer__slider'),
      sliderNextBtn = document.querySelector('.offer__slider-next'),
      sliderPrevBtn = document.querySelector('.offer__slider-prev'),
      current = document.querySelector('#current'),
      total = document.querySelector('#total'),
      slidesWrapper = document.querySelector('.offer__slider-wrapper'),
      slidesField = document.querySelector('.offer__slider-inner'),
      width = window.getComputedStyle(slidesWrapper).width;
      
showTotaltIndex();
showCurrentIndex();
setDefaultStylesForSlides();
addCarouselDots();

sliderNextBtn.addEventListener('click', () => {
  if(offset ==  widthAsInt() * (sliderElements.length - 1)){
    offset = 0;
  } else {
    offset += widthAsInt();
  }

  
  if(indexOfSlides == sliderElements.length){
    indexOfSlides = 1;
  } else {
    indexOfSlides++;
  }

  showCurrentSlide();

});

sliderPrevBtn.addEventListener('click', () => {
  if(offset == 0){
    offset = widthAsInt() * (sliderElements.length - 1);
  } else {
    offset -= widthAsInt();
  }
  
  
  if(indexOfSlides == 1){
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

