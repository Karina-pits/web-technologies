

function updateClock(){

let now = new Date(); //ств об часу

let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();

let separator = seconds % 2 === 0 ? ":" : " ";

document.getElementById("clock").textContent =
hours + separator + minutes + separator + seconds;

}

setInterval(updateClock,1000); //кожну сек




function startCountdown(){

let value = document.getElementById("targetDate").value;

if(!value){
alert("Виберіть дату і час");
return;
}

let target = new Date(value);

setInterval(function(){

let now = new Date();
let diff = target - now;

if(diff <= 0){
document.getElementById("countdown").textContent = "Час вийшов";
return;
}

let seconds = Math.floor(diff/1000)%60;
let minutes = Math.floor(diff/1000/60)%60;
let hours = Math.floor(diff/1000/60/60)%24;  // мат перетворення
let days = Math.floor(diff/1000/60/60/24);

document.getElementById("countdown").textContent =
days+" днів "+hours+" год "+minutes+" хв "+seconds+" сек";

},1000);

}




document.getElementById("calendarInput").onchange = function(){  //onchange: Функція запуститься лише тоді, коли користувач змінить дату в календарі.

let value = this.value;

let date = new Date(value);

let month = date.getMonth()+1; // повер номер місяця
let year = date.getFullYear();

document.getElementById("calendarInfo").textContent =
"Обраний місяць: "+month+" Рік: "+year;

};




function calculateBirthday(){

let birthday = new Date(document.getElementById("birthday").value);

let now = new Date();                   //сьогодні

birthday.setFullYear(now.getFullYear());

if(birthday < now){
birthday.setFullYear(now.getFullYear()+1);   // переносимо дату на рік вперед
}

setInterval(function(){

let diff = birthday - new Date();

let seconds = Math.floor(diff/1000)%60;
let minutes = Math.floor(diff/1000/60)%60;
let hours = Math.floor(diff/1000/60/60)%24;
let days = Math.floor(diff/1000/60/60/24);
let months = Math.floor(days/30);

document.getElementById("birthdayResult").textContent =
"До дня народження: "+months+" міс "+
days+" днів "+
hours+" год "+
minutes+" хв "+
seconds+" сек";

},1000);

}










//Об’єкт Date у JavaScript — це вбудований «швейцарський 
// годинник». Він вміє дізнаватися поточний час, зберігати
//  конкретну дату з минулого чи майбутнього та виконувати з 
// ними математичні операції.