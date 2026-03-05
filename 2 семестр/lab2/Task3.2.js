function getSeason(month) {
    if (month >=1 && month <= 12){

        if (month === 12 || month === 1 || month === 2) {
            return "Зима";
        } else if (month >= 3 && month <= 5){
            return "Весна";
        } else if (month >= 6 && month <= 8){
            return "Літо";
        } else {
            return "Осінь";
        }
    } else {
        return "Невірний місяць";
    }
}

console.log(getSeason(4))