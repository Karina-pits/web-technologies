// ЗАВДАННЯ 1
function task1() {
    let fruits = ["яблуко", "банан", "груша", "апельсин"];

    
    fruits.pop();
    console.log("1.1:", fruits);

    
    fruits.unshift("ананас");
    console.log("1.2:", fruits);

    
    fruits.sort().reverse();
    console.log("1.3:", fruits);

   
    let index = fruits.indexOf("яблуко");
    console.log("1.4 Індекс яблука:", index);
}

// ЗАВДАННЯ 2
function task2() {
    let colors = ["червоний", "синій", "зелений", "жовтий", "синій темний"];

    
    let longest = colors.reduce((a, b) => a.length > b.length ? a : b);
    let shortest = colors.reduce((a, b) => a.length < b.length ? a : b);

    console.log("2.1 Найдовший:", longest);
    console.log("2.1 Найкоротший:", shortest);

    
    let filtered = colors.filter(c => c.includes("синій"));
    console.log("2.3 Тільки синій:", filtered);

    
    let joined = colors.join(", ");
    console.log("2.4 Рядок:", joined);
}

//ЗАВДАННЯ 3
function task3() {
    let employees = [
        { name: "Іван", age: 25, position: "розробник" },
        { name: "Марія", age: 30, position: "дизайнер" },
        { name: "Петро", age: 28, position: "розробник" }
    ];

   
    employees.sort((a, b) => a.name.localeCompare(b.name));
    console.log("3.2 Сортування:", employees);

    
    let devs = employees.filter(e => e.position === "розробник");
    console.log("3.3 Розробники:", devs);

    
    employees = employees.filter(e => e.age >= 28);
    console.log("3.4 Після видалення:", employees);

    
    employees.push({ name: "Олена", age: 22, position: "тестер" });
    console.log("3.5 Оновлений:", employees);
}

//ЗАВДАННЯ 4
function task4() {
    let students = [
        { name: "Олексій", age: 20, course: 2 },
        { name: "Анна", age: 22, course: 3 },
        { name: "Ігор", age: 19, course: 1 }
    ];

    
    students = students.filter(s => s.name !== "Олексій");

    
    students.push({ name: "Марко", age: 21, course: 2 });

    
    students.sort((a, b) => b.age - a.age);

    console.log("4.4 Сортування:", students);

    
    let course3 = students.find(s => s.course === 3);
    console.log("4.5 Студент 3 курсу:", course3);
}

//ЗАВДАННЯ 5
function task5() {
    let numbers = [1, 2, 3, 4, 5];

    
    let squares = numbers.map(n => n * n);
    console.log("5.1 Квадрати:", squares);

    
    let even = numbers.filter(n => n % 2 === 0);
    console.log("5.2 Парні:", even);

    
    let sum = numbers.reduce((a, b) => a + b, 0);
    console.log("5.3 Сума:", sum);

    
    let extra = [6, 7, 8, 9, 10];
    numbers = numbers.concat(extra);
    console.log("5.4 Доданий масив:", numbers);

    
    numbers.splice(0, 3);
    console.log("5.5 Після splice:", numbers);
}

//ЗАВДАННЯ 6
function libraryManagement() {

    let books = [
        { title: "Кобзар", author: "Шевченко", genre: "поезія", pages: 300, isAvailable: true },
        { title: "1984", author: "Орвелл", genre: "антиутопія", pages: 250, isAvailable: true }
    ];

    function addBook(title, author, genre, pages) {
        books.push({ title, author, genre, pages, isAvailable: true });
    }

    function removeBook(title) {
        books = books.filter(b => b.title !== title);
    }

    function findBooksByAuthor(author) {
        return books.filter(b => b.author === author);
    }

    function toggleBookAvailability(title, isBorrowed) {
        let book = books.find(b => b.title === title);
        if (book) {
            book.isAvailable = !isBorrowed;
        }
    }

    function sortBooksByPages() {
        books.sort((a, b) => a.pages - b.pages);
    }

    function getBooksStatistics() {
        let total = books.length;
        let available = books.filter(b => b.isAvailable).length;
        let borrowed = total - available;
        let avgPages = books.reduce((sum, b) => sum + b.pages, 0) / total;

        return { total, available, borrowed, avgPages };
    }

   
    addBook("Гаррі Поттер", "Роулінг", "фентезі", 400);
    removeBook("1984");
    toggleBookAvailability("Кобзар", true);
    sortBooksByPages();

    console.log("6. Книги:", books);
    console.log("6. Пошук:", findBooksByAuthor("Шевченко"));
    console.log("6. Статистика:", getBooksStatistics());
}

//ЗАВДАННЯ 7
function task7() {
    let student = {
        name: "Ірина",
        age: 20,
        course: 2
    };

    
    student.subjects = ["Математика", "Програмування"];

    
    delete student.age;

    console.log("7. Оновлений студент:", student);
}


task1();
task2();
task3();
task4();
task5();
libraryManagement();
task7();