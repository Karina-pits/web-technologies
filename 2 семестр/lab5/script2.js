let red = document.getElementById("red");
let yellow = document.getElementById("yellow");
let green = document.getElementById("green");
let text = document.getElementById("stateText");

let startBtn = document.getElementById("startBtn");
let nextBtn = document.getElementById("nextBtn");
let changeBtn = document.getElementById("changeTime");

let redTime = 5000;
let yellowTime = 3000;
let greenTime = 7000;

let state = 0;
let timer;


function showState() {

red.style.opacity = "0.3";  
yellow.style.opacity = "0.3";  //усі 3 лампи напів прозорі
green.style.opacity = "0.3";

if(state === 0){
red.style.opacity = "1";   //робимо повністю видимим
text.textContent = "Стан: червоний";
}

if(state === 1){
yellow.style.opacity = "1";
text.textContent = "Стан: жовтий";
}

if(state === 2){
green.style.opacity = "1";
text.textContent = "Стан: зелений";
}

}


function startTraffic(){

showState();

if(state === 0){
timer = setTimeout(function(){
state = 1;  //Готуємо жовтий
startTraffic();  // запускаємо функ знову(рекурсія)
}, redTime);
}

else if(state === 1){
timer = setTimeout(function(){
state = 2;
startTraffic();
}, yellowTime);
}

else if(state === 2){
timer = setTimeout(function(){
blinkYellow();
}, greenTime);
}

}


function blinkYellow(){

let count = 0;

let interval = setInterval(function(){     // викон код всеред кожні 500 мілісек

yellow.style.opacity = yellow.style.opacity === "1" ? "0.3" : "1";  //Якщо зараз яскравість 1 (горить) — зроби її 0.3 (тьмяна).Інакше (якщо вона 0.3) — зроби її 1.

count++;

if(count === 6){
clearInterval(interval);   // зупиняємо
state = 0;                  //готуємо червоний
startTraffic();            // поверт в осн цикл
}

},500);

}


startBtn.onclick = function(){
startTraffic();
}


nextBtn.onclick = function(){

clearTimeout(timer);

state++;

if(state > 2){   // якщо став 3 скидаємо на 0 , перемикання по колу
state = 0;
}

showState();

}


changeBtn.onclick = function(){

let r = prompt("Час червоного (сек)");
let y = prompt("Час жовтого (сек)");
let g = prompt("Час зеленого (сек)");

if(r) redTime = r * 1000;
if(y) yellowTime = y * 1000;
if(g) greenTime = g * 1000;

}






//setTimeout (Будильник) - Функція, яка виконує код один 
// раз після того, як мине вказаний час.
//setInterval (Метроном) - Функція, яка виконує код нескінченно
//  багато разів через рівні проміжки часу.