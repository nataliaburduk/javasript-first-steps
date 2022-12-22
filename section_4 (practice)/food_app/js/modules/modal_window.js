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

export default modalWindow;
export {closeModal};
export {openModal};