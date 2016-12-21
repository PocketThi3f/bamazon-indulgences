// Global Variables for npm packages installed
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

// This var allows for connection to the mysql workbench via mysql npm package
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "Bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  startUp();
});

// This brings up the required variable of CLI-Table npm package
var table = new Table({
  chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },

  head: ['ID', 'Product Name', 'Cattygory', 'Pryce', 'Stock Quankitty']       
});

var startUp = function() {
  var query = 'SELECT * FROM products';
      connection.query(query, function(err, body) {
        if (err) {
          console.log('Oops, something went wrong! Take another look.');
        }
          console.log('Welcome to duh Tem Shop!');
            for (var i = 0; i < body.length; i++) {
              table.push(
                [body[i].item_id, body[i].product_name, body[i].department_name, body[i].price, body[i].stock_quantity]
              )};
              console.log(table.toString());

              welcomeIn();
      });
}      


function welcomeIn() {
  inquirer.prompt([
    {
      name: "action",
      type: "rawlist",
      message: "HI! I'm Temmie :3. Welcome To Temmie\'s Shop! What would you like to du?",
      choices: ["Buy En Itum Frum Temmie!", "Leave Shop"]
    }
  ]).then(function(answer) {
      if (answer === "Buy En Itum Frum Temmie!") {
        console.log('Sounds Guud!');
        itemPurchase();
      }
      else if (answer === "Leave Shop") {
        console.log('See You Agin Soon! ^3^/');
        connection.end();
      }
    })
};


function itemPurchase() {
  inquirer.prompt([
    {
      name: "product",
      type: "input",
      message: "How many would you like to take from Temmie?"
    }
  ]).then(function(answer) {
      var query = "UPDATE products SET ? WHERE ?";
        connection.query(query, { id: item_id }, function(err, res) {
            for (var i = 0; i < res.length; i++) {
              console.log("ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Cattygory: " + res[i].department_name + " || Pryce: " + res[i].price + " || Stock Quankitty: " +res[i].stock_quantity);
              console.log("Yey! Temmie is thankful, but wheel miss those itums. :\'[");
            }
            runSearch();
        });
    });
};

// Do not forget to install npm inquirer AND npm mysql~!!!
// Also, make the connection page as shown in class and put all the JS in here!!!
