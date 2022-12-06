// function amountOfPages(summary){
//   let stringResult = '';
//   let numberOfPages = 0;

//   while (stringResult.length < summary) {
//     numberOfPages++;
//     stringResult += numberOfPages;
//   }

//   return numberOfPages;
   

    
 
// }

// amountOfPages(25);


// function isPangram(string) {
//   let upperString = string.toUpperCase();
//   let alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
//   let isContain = (letter) => upperString.includes(letter);

//   return alphabet.every(isContain);
// }

// const users = [
//   { name: 'Gleb', age: 24 },
//   { name: 'Natallia', age: 24 },
//   { name: 'Bat', age: 2 },
//   { name: 'Rachel', age: 34 },
//   { name: 'Monica', age: 35 },
// ]


// function searchByName(name) {
//   return users.filter(user => user.name.toUpperCase().includes(name.toUpperCase()));
// }


// function findByName(name) {
//   return users.find(user => name.toUpperCase() === user.name.toUpperCase());
// }

// function allWithUpperCasedNames() {
//   let upperCasedArr = users.map(user => {
//     return {
//       name: user.name.toUpperCase() 
//     };
//   });

//   return upperCasedArr;
// }

// function upperCasedNames() {
//   return users.map(user => user.name.toUpperCase());
// }

// function names() {
//   return users.map(user => user.name);
// }

// function isAllAgeMoreThan18() {
//   return users.every(user => user.age >= 18);
// }

// function isAgeLessThan18() {
//   return !isAllAgeMoreThan18();
// }


// function sortedNames() {
//   return users.sort(compareUsersByNameASC);
// }

// function compareUsersByNameASC(user1, user2) {
//   const nameA = user1.name.toUpperCase(); 
//   const nameB = user2.name.toUpperCase(); 
//   if (nameA < nameB) {
//     return -1;
//   } else if (nameA > nameB) {
//     return 1;
//   } else {
//     return 0;
//   }
// }

// function compareUsersByAgeDESC(user1, user2) {
//   const ageA = user1.age; 
//   const ageB = user2.age; 
//   if (ageA < ageB) {
//     return -1;
//   } else if (ageA > ageB) {
//     return 1;
//   } else {
//     return 0;
//   }
// }

// function sortByAge() {
//   return users.sort(compareUsersByAgeDESC);
// }


// function sortByNameAndAge() {
//   return users.sort((a, b) => {
//     let result = compareUsersByAgeDESC(a, b);

//     if (result === 0) {
//       result = compareUsersByNameASC(a, b);
//     }
    
//     return result;
//   });
// }



// function deepCount(a){
//   let sum = 0;
//   a.forEach(element => {
//     if (Array.isArray(element)){
//       sum += deepCount(element);
//     }
//   });
//   return sum +a.length;
// }


// function deepCountOfObject(obj){
//   let sumOfKeys = 0;
//   let modifiedArr = Object.entries(obj);

//   modifiedArr.forEach(element => {
//     const [key, value] = element;
//     if (typeof(value ==='object')){
//       sumOfKeys += deepCountOfObject(value);
//     }
//   });
//   return sumOfKeys + modifiedArr.length;
// }


// function deepFind(obj, keys){
  
// }



//Promise

console.log('Загрузка данных...');

const req = new Promise(function(resolve, reject){
  console.log('Promis started')

  // // ...

  // if (200) {
  //   resolve();
  // } else {
  //   reject();
  // }

  setTimeout(() => {
    console.log('Подготовка данных...');
  
    const product = {
      name: 'TV',
      price: 2000 
    };

    resolve(product);
  }, 2000);

});

console.log('!')


// req.then((product) => {
//   // setTimeout(() => {
//   //   product.status = 'order';
//   //   console.log(product);
//   // }, 2000);
// });


req.then((product) => {
  console.log('Данные получены');

  return new Promise((resolve, reject) => {
    console.log('Обновляю продукт');
    setTimeout(() => {
      product.status = 'order';
      resolve(product);
      // reject();
    }, 2000);
  });
}).then((data) => {
  console.log(data);
}).catch(() => {
  console.error('Произошла ошибка');
}).finally(() => {
  console.log('Finally');
});



const test = time => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time);
  });
};

test(1000).then(() => console.log('1000 ms'));
test(2000).then(() => console.log('2000 ms'));

Promise.all([test(1000), test(2000)]).then(() => {
  console.log('All');
});

Promise.race([test(1000), test(2000)]).then(() => {
  console.log('All');
});



// //.catch(() => {
//   console.log("Не получилось стянуть продукт");
// });




let formData = {
  email:'',
  password: ''
};

new Promise ((resolve, reject) => {
  //send request to validate email
  const reqStatus = 200;
  if (reqStatus === 200){
    resolve();
  } else {
    reject(reqStatus);
  }
}).then(() => {
  console.log('Email валиден!');
}).then(() => {
  return new Promise((resolve, reject) => {
    //send request to DB;
    const reqStatus = 400;
    if (reqStatus === 200){
      resolve();
    } else {
      reject(reqStatus);
    }
  });
}).then(()=> {
  console.log('Мы создали новый аккаунт');
}).catch((reqStatus) => {
  console.log(`Что-то пошло не так... Статус ${reqStatus}`);
}).finally(() => {
  formData = {};
});

console.log(formData);

setTimeout(() => {
  console.log(formData);
}, 2000);


const films = [
  {
      name: 'Titanic',
      rating: 9
  },
  {
      name: 'Die hard 5',
      rating: 5
  },
  {
      name: 'Matrix',
      rating: 8
  },
  {
      name: 'Some bad film',
      rating: 4
  }
];

let goodFilms = films.filter(showGoodFilms);

function showGoodFilms(arr) {
  if (arr.rating >= 8){
    return true;
  }
  
}

console.log(goodFilms);

// fetch('https://jsonplaceholder.typicode.com/posts/101')
//   // method: 'POST',
//   // body: JSON.stringify({name: 'Natalia'}),
//   // headers: {
//   //   'Content-type': 'application/json'
//   // }

//   .then(response => response.json())
//   .then(todo => console.log(todo));