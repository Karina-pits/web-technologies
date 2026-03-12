// 1. Сума перших 10 чисел Фібоначчі (while)
function task1() {
    let a = 0;
    let b = 1;
    let count = 0;
    let sum = 0;

    while (count < 10) {
        sum += a;

        let next = a + b;
        a = b;
        b = next;

        count++;
    }

    console.log("Завдання 1: Сума перших 10 чисел Фібоначчі =", sum);
}


// 2. Сума всіх простих чисел від 1 до 1000 (for)
function task2() {
    let sum = 0;

    for (let i = 2; i <= 1000; i++) {
        let isPrime = true;

        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }

        if (isPrime) {
            sum += i;
        }
    }

    console.log("Завдання 2: Сума простих чисел =", sum);
}


// 3. День тижня (switch)
function task3() {
    let day = Number(prompt("Введіть число від 1 до 7"));

    let dayName;

    switch (day) {
        case 1:
            dayName = "Понеділок";
            break;
        case 2:
            dayName = "Вівторок";
            break;
        case 3:
            dayName = "Середа";
            break;
        case 4:
            dayName = "Четвер";
            break;
        case 5:
            dayName = "П’ятниця";
            break;
        case 6:
            dayName = "Субота";
            break;
        case 7:
            dayName = "Неділя";
            break;
        default:
            dayName = "Неправильне число";
    }

    console.log("Завдання 3:", dayName);
}


// 4. Рядки з непарною довжиною
function task4(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length % 2 !== 0) {
            result.push(arr[i]);
        }
    }

    console.log("Завдання 4:", result);
}


// 5. Стрілкова функція (кожне число +1)
const task5 = (numbers) => {
    let result = numbers.map(num => num + 1);

    console.log("Завдання 5:", result);
}


// 6. Сума або різниця = 10
function task6(a, b) {
    let result = (a + b === 10) || (Math.abs(a - b) === 10);

    console.log("Завдання 6:", result);
}


// Виклик функцій
task1();
task2();
task3();
task4(["apple", "cat", "banana", "dog", "sun"]);
task5([1, 2, 3, 4, 5]);
task6(7, 3);