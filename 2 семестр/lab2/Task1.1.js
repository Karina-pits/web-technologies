function getMinMax(arr) {
    if (arr.length === 0) {
        return null;
    }

    let min = arr [0];
    let max = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }

        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return {min: min, max: max};
}

console.log(getMinMax([3, 7, 1, 9, 4]));