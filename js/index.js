// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "class": "violet", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый",  "class": "green","weight": 35},
  {"kind": "Личи", "color": "розово-красный",  "class": "carmazin","weight": 17},
  {"kind": "Карамбола", "color": "желтый",  "class": "yellow","weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый",  "class": "lightbrown", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
    console.log('display');
    //  очищаем fruitsList от вложенных элементов,
    // чтобы заполнить актуальными данными из fruits
    fruitsList.innerHTML = '';
    for (let i = 0; i < fruits.length; i++) {
        let li = document.createElement("li");
        li.className = 'fruit__item fruit_' + fruits[i].class;
        li.innerHTML = fruits[i].kind;
        let innderPart = '<div class="fruit__info"><div>index: ' + i + '</div><div>kind: ' + fruits[i].kind + '</div><div>color: ' + fruits[i].color + '</div><div>weight (кг): ' + fruits[i].weight + '</div></div>';
        li.innerHTML = innderPart;

        fruitsList.appendChild(li);
    }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
    let result = [];

    // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
    while (fruits.length > 0) {

        // TODO: допишите функцию перемешивания массива
        // Подсказка: находим случайный элемент из fruits, используя getRandomInt
        let randomInt = getRandomInt(0, fruits.length - 1);
        result.push(fruits[randomInt]);
        // вырезаем его из fruits и вставляем в result.
        fruits.splice(randomInt, 1);

        // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
        // (массив fruits будет уменьшатся, а result заполняться)

    }

    fruits = result;

};

shuffleButton.addEventListener('click', () => {
    shuffleFruits();
    display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
    let fruitsTemp = JSON.parse(fruitsJSON);

    let minWeight = parseInt(document.querySelector('.minweight__input').value);
    let maxWeight = parseInt(document.querySelector('.maxweight__input').value);

    if (isNaN(minWeight) && isNaN(maxWeight)) {
        fruits = fruitsTemp;
        return;
    }

    let filteredFruits = fruitsTemp.filter((item) => {
        return item.weight >= minWeight && item.weight <= maxWeight;
    });

    fruits = filteredFruits;
};

filterButton.addEventListener('click', () => {
    filterFruits();
    display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
    if (a.color < b.color) {
        return -1;
    }
    if (a.color > b.color) {
        return 1;
    }
    return 0;
};


const sortAPI = {
    bubbleSort(arr, comparation) {
        let len = arr.length;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                if (comparation(arr[j], arr[j + 1]) > 0) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    },

    quickSort(arr, comparation) {
        arr = quickSort(arr, comparation);
        fruits = arr;
    },

    // выполняет сортировку и производит замер времени
    startSort(sort, arr, comparation) {
        const start = new Date().getTime();
        sort(arr, comparation);
        const end = new Date().getTime();
        sortTime = `${end - start} ms`;
    },
};

function quickSort(arr, comparation) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[Math.floor(arr.length / 2)];
    const less = [];
    const greater = [];
    const equal = [];

    for (let i = 0; i < arr.length; i++) {
        const compare = comparation(arr[i], pivot);
        if (compare < 0) {
            less.push(arr[i]);
        } else if (compare > 0) {
            greater.push(arr[i]);
        } else {
            equal.push(arr[i]);
        }
    }

    return [...quickSort(less, comparation), ...equal, ...quickSort(greater, comparation)];
}

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
    console.log(sortKind);
    sortKind === 'bubbleSort' ? sortKind = 'quickSort' : sortKind = 'bubbleSort';
    sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
    sortTimeLabel.textContent = 'sorting...';
    const sort = sortAPI[sortKind];
    sortAPI.startSort(sort, fruits, comparationColor);
    display();
    sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
    const kind = kindInput.value.trim();
    const color = colorInput.value.trim();
    const weight = parseInt(weightInput.value.trim());

    if (!kind || !color || isNaN(weight)) {
        alert('Заполните все поля!');
        return;
    }

    const newFruit = {
        kind,
        color,
        weight
    };

    fruits.push(newFruit);
    display();
});
