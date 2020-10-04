// REQUIREMENTS
const inquirer = require("inquirer");

// FUNCTIONS
// asks initial question "What would you like to do?"
// directs user to next function based on response
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
        updateRole();
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

// displays all employees
function viewAllEmployees() {
  console.log("View All Employees");
}

// displays all employees by department
function employeesByDepartment() {
  console.log("View All Employees by Department");
}

// displays all employees by manager
function employeesByManager() {
  console.log("View All Employees by Manager");
}

// add an employee to the database
function addEmployee() {
  console.log("Add Employee");
}

// remove an employee from the database
function removeEmployee() {
  console.log("Remove Employee");
}

// update the role of an employee
function updateRole() {
  console.log("Update Employee Role");
}

// update the manager of an employee
function updateManager() {
  console.log("Update Employee Manager");
}

// view a list of all roles
function viewAllRoles() {
  console.log("View All Roles");
}

// FUNCTION CALLS
// asks the initial question
initialQuestion();
