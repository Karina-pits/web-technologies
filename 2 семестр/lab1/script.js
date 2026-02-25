let divElement = document.getElementsByTagName('div')[0];

divElement.textContent = "Hello world!";

function showName() {
    divElement.textContent = "Каріна Піць";
}

let button = document.getElementsByTagName('button')[0];

button.onmouseout = showName;