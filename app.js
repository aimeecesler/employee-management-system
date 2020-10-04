const inquirer = require("inquirer");

function initialQuestion() {
  inquirer.prompt({
    type: "list",
    message: "What would you like to do?",
    name: "action",
    choices: [
      "View All Employees",
      "View All Employees by Department",
      "View All Employees by Manager",
      "Add Employee",
      "Remove Employee",
      "Update Employee Role",
      "Update Employee Manager",
      "View All Roles",
      "Exit",
    ],
  });
}

initialQuestion();
