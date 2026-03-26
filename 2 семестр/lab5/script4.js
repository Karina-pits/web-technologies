const readline = require("readline");

class Product {
    constructor(id, name, price, quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity; // Кількість на складі
    }
}

class Catalog {
    constructor() {
        this.products = new Map();
        this.productHistory = new WeakMap();     //Вона тримає дані про об'єкт лише доти, доки цей об'єкт існує в програмі.

        this.orders = new Set();     //Set — це колекція, яка зберігає тільки унікальні значення.
        this.users = new WeakSet();       //Працює так само як WeakMap, але зберігає тільки об'єкти (користувачів) без додаткових значень.
    }

    addProduct(product) {
        if (this.products.has(product.id)) {
            console.log("Продукт з таким id вже існує!");
            return;
        }

        this.products.set(product.id, product);
        this.productHistory.set(product, [`Створено продукт: ${product.name}`]);

        console.log("Продукт додано!");
    }

    removeProduct(id) {
        const product = this.products.get(id);

        if (!product) {
            console.log("Продукт не знайдено");
            return;
        }

        this.products.delete(id);
        console.log("Продукт видалено");
    }

    updateProduct(id, newPrice, newQuantity) {
        const product = this.products.get(id);

        if (!product) {
            console.log("Продукт не знайдено");
            return;
        }

        if (newPrice !== undefined) product.price = newPrice;   //Виконуй дію тільки якщо користувач реально щось надіслав
        if (newQuantity !== undefined) product.quantity = newQuantity;           //якщо ти не передав ціну то програма просто ігнорує і залишає стару

        const history = this.productHistory.get(product) || [];

        history.push(`Оновлено: ціна ${product.price}, кількість ${product.quantity}`);

        this.productHistory.set(product, history);

        console.log("Продукт оновлено");
    }

    findProductByName(name) {
        let found = false;

        for (const product of this.products.values()) {

            if (product.name.toLowerCase() === name.toLowerCase()) {
                console.log(product);
                found = true;
            }
        }

        if (!found) {
            console.log("Продукт не знайдено");
        }
    }

    placeOrder(user, productId, quantity) {
        const product = this.products.get(productId);

        if (!product) {
            console.log("Продукт не знайдено");
            return;
        }

        if (product.quantity < quantity) {
            console.log("Недостатньо товару на складі");
            return;
        }

        product.quantity -= quantity;

        const order = {              //чек
            user,
            product,
            quantity,
            date: new Date()
        };

        this.orders.add(order);

        this.users.add(user);                        //Ми додаємо об'єкт користувача у WeakSet
 
        console.log("Замовлення оформлено!");
    }

    showProductHistory(id) {
        const product = this.products.get(id);

        if (!product) {
            console.log("Продукт не знайдено");
            return;
        }

        const history = this.productHistory.get(product) || [];

        console.log("Історія змін:");

        history.forEach(h => console.log(h));               // перебираємо виводимо
    }

    showProducts() {
        for (const product of this.products.values()) {
            console.log(product);
        }
    }
}

const catalog = new Catalog();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menu() {

    console.log("\n МЕНЮ ");
    console.log("1 - Додати продукт");
    console.log("2 - Видалити продукт");
    console.log("3 - Оновити продукт");
    console.log("4 - Пошук продукту");
    console.log("5 - Зробити замовлення");
    console.log("6 - Історія продукту");
    console.log("7 - Показати всі продукти");
    console.log("0 - Вихід");

    rl.question("Оберіть дію: ", (choice) => {

        switch (choice) {

            case "1":
                rl.question("ID: ", id => {
                    rl.question("Назва: ", name => {
                        rl.question("Ціна: ", price => {
                            rl.question("Кількість: ", quantity => {

                                const product = new Product(
                                    Number(id),
                                    name,
                                    Number(price),
                                    Number(quantity)
                                );

                                catalog.addProduct(product);
                                menu();

                            });
                        });
                    });
                });
                break;

            case "2":
                rl.question("ID продукту: ", id => {
                    catalog.removeProduct(Number(id));
                    menu();
                });
                break;

            case "3":
                rl.question("ID продукту: ", id => {
                    rl.question("Нова ціна: ", price => {
                        rl.question("Нова кількість: ", quantity => {

                            catalog.updateProduct(
                                Number(id),
                                Number(price),
                                Number(quantity)
                            );

                            menu();

                        });
                    });
                });
                break;

            case "4":
                rl.question("Назва продукту: ", name => {
                    catalog.findProductByName(name);
                    menu();
                });
                break;

            case "5":
                rl.question("Ім'я користувача: ", username => {

                    const user = { name: username };

                    rl.question("ID продукту: ", id => {
                        rl.question("Кількість: ", quantity => {

                            catalog.placeOrder(
                                user,
                                Number(id),
                                Number(quantity)
                            );

                            menu();

                        });
                    });
                });
                break;

            case "6":
                rl.question("ID продукту: ", id => {
                    catalog.showProductHistory(Number(id));
                    menu();
                });
                break;

            case "7":
                catalog.showProducts();
                menu();
                break;

            case "0":
                rl.close();
                break;

            default:
                console.log("Невірна команда");
                menu();
        }

    });
}

menu();













//Set - колекція унікальних значень

//WeakMap - ключем може бути тільки об'єкт , якщо об видалено з 
//програми то і тут видал автоматично

//WeakSet - Це як Set, але для об'єктів і зі "слабкими" зв'язками.