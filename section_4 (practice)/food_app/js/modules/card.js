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

module.exports = card;