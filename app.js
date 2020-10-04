const inquirer = require("inquirer");

function initialQuestion() {
  inquirer
    .prompt({
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
    })
    .then((res) => {
      if (res.action === "View All Employees") {
        viewAllEmployees();
      } else if (res.action === "View All Employees by Department") {
        employeesByDepartment();
      } else if (res.action === "View All Employees by Manager") {
        employeesByManager();
      } else if (res.action === "Add Employee") {
        addEmployee();
      } else if (res.action === "Remove Employee") {
        removeEmployee();
      } else if (res.action === "Update Employee Role") {
        updateEmployeeRole();
      } else if (res.action === "Update Employee Manager") {
        updateManager();
      } else if (res.action === "View All Roles") {
        viewAllRoles();
      } else if (res.action === "Exit") {
        return;
      }
    })
    .catch((err) => console.log(err));
}

initialQuestion();
