function getSeason2(month) {
    return (month < 1 || month >12) ? "Неправильний місяць" :
    (month === 12 || month === 1 || month === 2) ? "Зима" :
    (month >= 3 && month <= 5) ? "Весна" :
    (month >= 6 && month <= 8) ? "Літо" :
    "Осінь";
}

console.log(getSeason2(6));