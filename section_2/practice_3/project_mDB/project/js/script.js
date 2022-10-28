/* Задания на урок 1:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */


/* Задания на урок 2:

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

document.addEventListener('DOMContentLoaded', () => {
    
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    
    const promoVirus = document.querySelectorAll('.promo__adv img');
    const genreChanging = document.querySelectorAll('.promo__genre');
    const backChanging = document.getElementsByClassName('promo__bg');
    const confirmationButton = document.querySelector('#confirm-btn');
    const input = document.querySelector('.adding__input');
    const favFilmCheckBox = document.querySelector('#favouriteFilm');
    const listOfFilms = document.querySelector('.promo__interactive-list');


    const deleteAdv = (arr) => {
        for (let i=0; i< arr.length; i++){
            arr[i].remove();
        }
    };
    

    const changeGenre = (arrGenres) => {
        arrGenres[0].textContent = 'драма';
    };


    const changeBackground = (arrToChange) => {
        arrToChange[0].style.background = 'url("img/bg.jpg") center center/cover no-repeat';
    }; 
    

    function rewriteLoop(){
        listOfFilms.innerHTML = '';
        movieDB.movies.sort().forEach((movieName, k) => {
            listOfFilms.innerHTML += `
            <li id='movie-${k}' class="promo__interactive-item">${k+1} ${truncateName(movieName)}
            <div class="delete"></div>
            </li>
            `;
        });
    }
    
    
    listOfFilms.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete')) {
            let result = confirm("Want to delete?");
            if (result) {
                let movieItem = event.target.parentNode;
                let movieId = +movieItem.id.replace('movie-', '');
                movieDB.movies.splice(movieId, 1);
                rewriteLoop();
            }
        }
    });
    
    
    confirmationButton.addEventListener('click', () => {
        if (input.value.trim().length > 0){
            movieDB.movies.push(input.value.trim());
            rewriteLoop();
            if (favFilmCheckBox.checked){
                console.log("Добавляем любимый фильм");
            }
        }
        
        input.value = '';
    });
    
    input.addEventListener('focusout', ()=>{
        input.value = input.value.trim();
    });
    
    function truncateName(filmName, num = 21){
        if (filmName.length > num){
            return filmName.slice(0, num) + '...';
        } else {
            return filmName;
        }
    }
    
    
    deleteAdv(promoVirus);
    changeGenre(genreChanging);
    changeBackground(backChanging);
    rewriteLoop();    
    
});
















    

