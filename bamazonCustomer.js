var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "Bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  ();
});

var runSearch = function() {
  inquirer.prompt({
    name: "action",
    type: "rawlist",
    message: "HI! I'm Temmie :3. Welcome To The Temmie Shop! What would you like to purchase?",
    choices: [
      "Give Temmie Money For An Item To Fund Fer Collage"
    ]
  }).then(function(answer) {
    switch (answer) {
      case "Give Temmie Money For An Item To Fund Fer Collage":
        productSearch();
        break;
    }
  });
};

var productSearch = function() {
  inquirer.prompt({
    name: "product",
    type: "input",
    message: "How many would you like to take from Temmie?"
  }).then(function(answer) {
    var query = "SELECT * FROM Bamazon WHERE ?";
    connection.query(query, { artist: answer.artist }, function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log("Item ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Category: " + res[i].department_name);
      }
      runSearch();
    });
  });
};

// Do not forget to install npm inquirer AND npm mysql~!!!
// Also, make the connection page as shown in class and put all the JS in here!!!
