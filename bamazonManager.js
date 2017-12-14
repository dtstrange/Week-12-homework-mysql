//requirements
var inquirer = require('inquirer');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'bamazon'
});



function openingMessage() {
    connection.connect();
    inquirer.prompt([
        {
            type: 'list',
            name: 'start',
            message: 'Do you wish to begin?',
            choices: [
                'Start',
                'Exit'
            ]
        }


    ])
        .then(function (answers) {
            if (answers.start === 'Start') {
                start();
            } else {
                connection.end();
            }
        })


};

function start() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'inventory',
            message: 'What would you like to do?',
            choices: [
                'View Products for Sale',
                'View Low Inventory',
                'Add to Inventory',
                'Add New Product',
                'Exit'
            ]
        }
    ])
        .then(function (answers) {
            if (answers.inventory === 'View Products for Sale') {
                connection.query('SELECT * FROM products', function (error, results, fields) {
                    if (error) throw error;
                    console.log(JSON.stringify(results, null, 2));
                    start();
                })
            } else if (answers.inventory === 'View Low Inventory') {
                connection.query('SELECT * FROM products WHERE stock_quantity < 5', function (error, lowResults, fields) {
                    if (error) throw error;
                    console.log(JSON.stringify(lowResults, null, 2));
                    start();
                })
            } else if (answers.inventory === 'Add to Inventory') {
                addInventory();
            } else if (answers.inventory === 'Add New Product') {
                addProduct();
            } else if (answers.inventory === 'Exit') {
                connection.end();
            }
        })
};

function addInventory() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'ID',
            message: "What is the product_id of the item you would like to update?"
        },
        {
            type: 'input',
            name: 'replenish',
            message: 'How many units would you like to add to the inventory?'
        }
    ]).then(function (answers) {
        connection.query('SELECT * FROM products WHERE item_id = ?', [answers.ID], function (error, results, fields) {
            if (error) throw error;
            var newQty = Math.floor(Number(results[0].stock_quantity) + Number(answers.replenish));
            connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [newQty, answers.ID], function (error, updateResults, fields) {
                if (error) throw error;
                console.log("Stock quantity:" + newQty)
            })
            start();
        })
    })
};

function addProduct(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'product',
            message: "What's the name of your product?"
        },
        {
            type: 'input',
            name: 'department',
            message: "What department does your product go in?"
        },
        {
            type: 'input',
            name: 'price',
            message: "Price of your product?"
        },
        {
            type: 'input',
            name: 'quantity',
            message: "How many units?"
        },
    ]).then(function(answers){
        var post = {product_name: answers.product, department_name: answers.department, price: answers.price, stock_quantity: answers.quantity};
        var query = connection.query('INSERT INTO products SET ?',post, function (error, results, fields) {
            if (error) throw error;
            console.log("product_name:"  + answers.product + "\n department_name:"  + answers.department + "\n price:" + answers.price + "\n stock_quantity:" + answers.quantity);
            start();
        })
    })
};









openingMessage();