var inquirer = require('inquirer');

var itemList = [

  {
    type: 'list',
    name: '',
    message: '',
    choices: ['']
  }
];

inquirer.prompt(itemList).then(function(err, data) {
  console.log(JSON.stringify(data, null, 2));
});

// Do not forget to install npm inquirer AND npm mysql~!!!
// Also, make the connection page as shown in class and put all the JS in here!!!
