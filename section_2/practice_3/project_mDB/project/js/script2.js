/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

const movieDB = {
  movies: [
      "Логан",
      "Лига справедливости",
      "Ла-ла лэнд",
      "Одержимость",
      "Скотт Пилигрим против..."
  ]
};
movieDB.movies.sort();

const promoVirus = document.querySelectorAll('.promo__adv img');
for (let i=0; i< promoVirus.length; i++){
  promoVirus[i].remove();
}

const genreChanging = document.querySelectorAll('.promo__genre');
genreChanging[0].textContent = 'драма';

const backChanging = document.getElementsByClassName('promo__bg');
backChanging[0].style.background = 'url("img/bg.jpg") center center/cover no-repeat';


const listOfFilms = document.querySelector('.promo__interactive-list');
listOfFilms.innerHTML = '';

movieDB.movies.forEach((movieName, k) => {
  listOfFilms.innerHTML += `
      <li class="promo__interactive-item">${k+1} ${movieName}
           <div class="delete"></div>
      </li>
  `;
});



