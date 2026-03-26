let bulb = document.getElementById("bulb");
let button = document.getElementById("toggleBtn");
let typeSelect = document.getElementById("bulbType");
let brightnessButton = document.getElementById("brightnessBtn");//«посилання» на  HTML-елементи

let isOn = false;
let brightness = 100;
let timer;


function resetTimer() {
    clearTimeout(timer);

    timer = setTimeout(function () {
        if (isOn) {
        bulb.src = "https://www.w3schools.com/js/pic_bulboff.gif";
        button.textContent = "Включити";
        isOn = false;
        alert("Лампочка автоматично вимкнулась через бездіяльність");//це вбудована функція браузера, яка перериває роботу користувача і виводить маленьке віконце з повідомленням зверху сторінки.
        }
    }, 300000); 
}


button.onclick = function () {

    if (isOn) {
        bulb.src = "https://www.w3schools.com/js/pic_bulboff.gif";
        button.textContent = "Включити";
        bulb.classList.remove("on");// Прибираємо ефекти увімкненої лампи
        bulb.classList.add("off");// Додаємо стиль вимкненої лампи
        isOn = false;
    } else {
        bulb.src = "https://www.w3schools.com/js/pic_bulbon.gif";
        button.textContent = "Виключити";
        bulb.classList.remove("off");
        bulb.classList.add("on");
        isOn = true;
    }

    resetTimer();
};


typeSelect.onchange = function () {//onchange — це подія, яка виникає в той момент, коли користувач вибрав інше значення у списку.

    let type = typeSelect.value;

    if (type === "normal") {
        alert("Вибрано звичайну лампочку");
    }

    if (type === "eco") {
        alert("Вибрано енергозберігаючу лампочку");
    }

    if (type === "led") {
        alert("Вибрано світлодіодну лампочку");
    }

    resetTimer();
};


brightnessButton.onclick = function () { //Коли користувач натисне на кнопку зміни яскравості, виконай цей код

    let type = typeSelect.value;

    if (type === "normal") {
        alert("Звичайна лампа не підтримує зміну яскравості");
        return;
    }

    let value = prompt("Введіть яскравість від 0 до 100");  //Це вбудоване вікно, куди користувач може ввести текст

    if (value !== null) {   //Якщо користувач натиснув "Скасувати" (Cancel) у вікні запиту, prompt поверне null
        brightness = value;
        bulb.style.opacity = brightness / 100;
    }

    resetTimer();
};


resetTimer();




//classList — це спеціальний об'єкт у JavaScript, 
// який містить усі класи HTML-елемента. 
// Він не просто показує їх як текст, а надає зручні 
// «інструменти-команди» для керування ними.
//classList дозволяє робити ці зміни точково, 
// не зачіпаючи інші класи, які вже є в елемента.