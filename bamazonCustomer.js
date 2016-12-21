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

// Breaks On Choice
// ===========================================================================================
function welcomeIn() {
  inquirer.prompt([
    {
      name: "action",
      type: "list",
      message: "HI! I'm Temmie :3. Welcome To Temmie\'s Shop! What would you like to du?",
      choices: ["Buy En Itum Frum Temmie!", "Leave Shop"]
    }
  ]).then(function(answer) {
      if (answer.action === "Buy En Itum Frum Temmie!" ) {
          console.log('Sounds Guud!');
          itemPurchase();
      }
      else {
        console.log('See You Agin Soon! ^3^/');
        connection.end();
      }
    });
};

 // switch (answer) {

 //        case "Buy En Itum Frum Temmie!":
 //        console.log('Sounds Guud!');
 //        itemPurchase();
 //        break;
      
 //        case "Leave Shop":
 //        console.log('See You Agin Soon! ^3^/');
 //        connection.end();
 //        break;
 //      }

var itemPurchase = function() {
  inquirer.prompt([
    {
      name: 'item_id',
      message: "Which itum would you lyke to buy?",
    },
    {
      name: 'quantity',
      message: 'How many units would you lyke?'
    }
  ]).then((response) => {
    // get data from db for the item the user selected
    retrieveItem(res.item_id).then((itemData) => {
      // get stock quantity
      var stockQuantity = itemData[0].stock_quantity;
      // get price
      var price = itemData[0].price;

      if(res.quantity <= stockQuantity) {
        // success case: if units are less than or equal to available units

        // process the order and print receipt
        var orderTotal = processOrder(price, res.quantity);
        console.log(`Order completed! Your card was charged $${orderTotal}`);

        // new stock quantity after purchase
        var quantityNew = stockQuantity - res.quantity;

        // update quantity in database
        updateStock(res.item_id, quantityNew);

        next();

      } else if (res.quantity > stockQuantity) {
        // error case: if units are greater than available units
        console.log('We don\'t have that many units in stock.');

        next();
      }
    });
  });
}

// Function for item retrieval
var retrieveItem = function(item_id) {

  return new Promise (function(resolve, reject) {
    query = 'SELECT item_id, product_name, price, stock_quantity FROM products WHERE item_id = ?';
    connection.query(query, [item_id], function(err, res) {
      if(err) {
        return reject('Error fetching quantity data. Error: ', err);
      }
      resolve(res);
    });
  });
}

// Function to update current stock after purchase
var updateStock = function(item_id, updateQuantity) {

  query = 'UPDATE products SET stock_quantity = ? WHERE item_id = ?';
  connection.query(query, [updateQuantity, item_id], function(error, response) {
    if(err) {
      return err;
    }

  });
}

// Function for total of transaction at end of purchase
var processOrder = function(price, quantity) {
  return price * quantity;
}

// Alternative?
// function itemPurchase() {
//   inquirer.prompt([
//     {
//       name: "product",
//       type: "input",
//       message: "How many would you like to take from Temmie?"
//     }
//   ]).then(function(answer) {
//       var query = "UPDATE products SET ? WHERE ?";
//         connection.query(query, { id: item_id }, function(err, res) {
//             for (var i = 0; i < res.length; i++) {
//               console.log("ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Cattygory: " + res[i].department_name + " || Pryce: " + res[i].price + " || Stock Quankitty: " +res[i].stock_quantity);
//               console.log("Yey! Temmie is thankful, but wheel miss those itums. :\'[");
//             }
//             welcomeIn();
//         });
//     });
// };

// Do not forget to install npm inquirer AND npm mysql~!!!
// Also, make the connection page as shown in class and put all the JS in here!!!
