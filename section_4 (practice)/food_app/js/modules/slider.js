function slider() {
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

module.exports = slider;