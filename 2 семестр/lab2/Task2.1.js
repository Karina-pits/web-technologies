function isInRange(number, min, max) {
    if (number >= min && number <= max) {
        return true;
    } else {
        return false;
    }
}

console.log(isInRange(5, 1, 10));