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

connection.connect();

function openingMessage() {
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
    .then(function (answers){
        if(answers.start === 'Start'){
            start();
        }else{
            connection.end();
        }
    })

    
};

    function start(){
        inquirer.prompt([
            {
                type: 'list',
                name: 'inventory',
                message: 'What would you like to do?',
                choices: [
                    'View Products for Sale',
                    'View Low Inventory',
                    'Add to Inventory',
                    'Add New Product'
                ]
            }
        ])
        .then(function (answers){
            
        })
    }









openingMessage();