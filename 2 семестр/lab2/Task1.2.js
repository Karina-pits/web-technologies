function compareObjects(obj1, obj2) {
    if (obj1.name === obj2.name && obj1.age === obj2.age) {
        return "Об'єкти однакові";
    } else {
        return "Об'єкти різні";
    }
}

let person1 = { name: "Karina", age: 20 };
let person2 = { name: "Anna", age: 20 };

console.log(compareObjects(person1, person2));