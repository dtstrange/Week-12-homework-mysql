//requirements
var inquirer = require('inquirer');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'bamazon'
});

connection.connect();


function start (){
    //displaying table from database
    connection.query('SELECT * FROM products', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
      });

      inquirer.prompt([
          {
          type: 'input',
          name: 'ID',
          message: 'What is the product_id of the item you would like to purchase?'
        },
      {
        type: 'input',
        name: 'quantity',
        message: 'How many would you like to purchase?'
      }
    ]).then()
};

start();