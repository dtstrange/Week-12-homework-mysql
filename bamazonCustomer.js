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

function start() {
  connection.connect();

  //displaying table from database
  connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;
    console.log(JSON.stringify(results, null, 2));
    afterConnection();
  });

  function afterConnection() {

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
    ]).then(function (answers) {
      connection.query('SELECT * FROM products WHERE item_id = ?', [answers.ID], function (error, results, fields) {
        if (error) throw error; 
        
        if (results[0].stock_quantity < answers.quantity) {
          console.log("Insufficient quantity!");
          connection.end();
        }
        else {
          var newQty = Math.floor(Number(results[0].stock_quantity) - Number(answers.quantity));
          connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [newQty, answers.ID], function (error, newResults, fields) {
            if (error) throw error;
            console.log("Cost of your purchase: $" + Math.round(Number(answers.quantity) * Number(results[0].price)));
            
        
            connection.end();
          })
        }

      });
    });
  }
}
  start();