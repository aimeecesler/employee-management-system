// REQUIREMENTS
const inquirer = require("inquirer");
const mysql = require("mysql");

// CONNECTION DETAILS
const connection = mysql.createConnection({
  host: "localhost",

  // PORT
  port: 3306,

  // USERNAME
  user: "root",

  // PASSWORD AND DATABASE
  password: "Password1!",
  database: "employeesDB",
});

// ESTABLISH CONNECTION
connection.connect(function (err) {
  if (err) throw err;
  console.log(" _______________________________________________");
  console.log("|    ___                    ___     ___   __    |");
  console.log("|   |   \\  |   |  |\\   |   |   \\   |     |  \\   |");
  console.log("|   |    \\ |   |  | \\  |   |    \\  |__   |__/   |");
  console.log("|   |    / |   |  |  \\ |   |    /  |     | \\    |");
  console.log("|   |___/  |___|  |   \\|   |___/   |___  |  \\   |");

  console.log("|                                               |");
  console.log("|                 ___  ___                      |");
  console.log("|     |\\  /|  |  |    |     |    |  |\\   |      |");
  console.log("|     | \\/ |  |  |__  |__   |    |  | \\  |      |");
  console.log("|     |    |  |  |    |     |    |  |  \\ |      |");
  console.log("|     |    |  |  |    |     |___ |  |   \\|      |");
  console.log("|_______________________________________________|");
  //
  // ask initial question once connection is established
  initialQuestion();
});

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
        "Edit Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "Add Department",
        "Remove Department",
        "Edit Department",
        "View All Departments",
        "Add Role",
        "Remove Role",
        "Edit Role",
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
      } else if (res.action === "Edit Employee") {
        editEmployee();
      } else if (res.action === "Update Employee Role") {
        updateRole();
      } else if (res.action === "Update Employee Manager") {
        updateManager();
      } else if (res.action === "Add Department") {
        addDepartment();
      } else if (res.action === "Remove Department") {
        removeDepartment();
      } else if (res.action === "Edit Department") {
        editDepartment();
      } else if (res.action === "View All Departments") {
        viewAllDepartments();
      } else if (res.action === "Add Role") {
        addRole();
      } else if (res.action === "Remove Role") {
        removeRole();
      } else if (res.action === "Edit Role") {
        editRole();
      } else if (res.action === "View All Roles") {
        viewAllRoles();
      } else if (res.action === "Exit") {
        connection.end();
      }
    })
    .catch((err) => console.log(err));
}

// displays all employees
function viewAllEmployees() {
  console.log("View All Employees");
  connection.query(
    `SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.dept_name, employee.manager_id
    FROM employee 
    LEFT JOIN roles ON employee.role_id = roles.id 
    LEFT JOIN department ON roles.department_id = department.id`,
    function (err, res) {
      if (err) throw err;
      console.table(res);
      initialQuestion();
    }
  );
}
// function viewAllEmployees() {
//   console.log("View All Employees");
//   connection.query(
//     `UPDATE employee e
//     JOIN employee m ON m.id = e.manager_id
//     SET e.manager_name = CONCAT(m.first_name, ' ', m.last_name)`,
//     (err, res) => {
//       if (err) throw err;
//       connection.query(
//         `SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.dept_name, employee.manager_name
//         FROM employee
//         LEFT JOIN roles ON employee.role_id = roles.id
//         LEFT JOIN department ON roles.department_id = department.id`,
//         (err, res) => {
//           if (err) throw err;
//           console.table(res);
//           initialQuestion();
//         }
//       );
//     }
//   );
// }

// displays all employees by department
function employeesByDepartment() {
  console.log("View All Employees by Department");
  connection.query(
    `SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.dept_name, employee.manager_id
    FROM employee 
    LEFT JOIN roles ON employee.role_id = roles.id 
    LEFT JOIN department ON roles.department_id = department.id
    ORDER BY department.dept_name`,
    function (err, res) {
      if (err) throw err;
      console.table(res);
      initialQuestion();
    }
  );
}

// displays all employees by manager
function employeesByManager() {
  console.log("View All Employees by Manager");
  connection.query(
    `SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.dept_name, employee.manager_id
    FROM employee 
    LEFT JOIN roles ON employee.role_id = roles.id 
    LEFT JOIN department ON roles.department_id = department.id
    ORDER BY employee.manager_id`,
    function (err, res) {
      if (err) throw err;
      console.table(res);
      initialQuestion();
    }
  );
}

// add an employee to the database
function addEmployee() {
  console.log("Add Employee");
  connection.query("SELECT * FROM roles", (err, data) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          message:
            "What is the first name of the employee you would like to add?",
          name: "first_name",
        },
        {
          type: "input",
          message:
            "What is the last name of the employee you would like to add?",
          name: "last_name",
        },
        {
          type: "list",
          message: "What role will this employee have?",
          name: "role",
          choices: renderRoleArray(data),
        },
      ])
      .then((res) => {
        const firstName = res.first_name;
        const lastName = res.last_name;
        let roleID;
        for (let i = 0; i < data.length; i++) {
          if (data[i].title === res.role) {
            roleID = data[i].id;
          }
        }
        // console.log(firstName, lastName, roleID);
        connection.query("SELECT * FROM employee", (err, data) => {
          if (err) throw err;
          inquirer
            .prompt({
              type: "list",
              message: "Who is this employee's manager?",
              name: "manager",
              choices: renderEmployeeArray(data),
            })
            .then((res) => {
              let managerID;
              for (let i = 0; i < data.length; i++) {
                if (
                  data[i].first_name + " " + data[i].last_name ===
                  res.manager
                ) {
                  managerID = data[i].id;
                }
              }
              console.log(firstName, lastName, roleID, managerID);
              connection.query(
                "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                [firstName, lastName, roleID, managerID],
                (err, res) => {
                  if (err) throw err;
                  console.log(res);
                  initialQuestion();
                }
              );
            })
            .catch((err) => {
              if (err) throw err;
            });
        });
      })
      .catch((err) => {
        if (err) throw err;
      });
  });
}

// remove an employee from the database
function removeEmployee() {
  console.log("Remove Employee");
  connection.query("SELECT * FROM employee", (err, data) => {
    if (err) throw err;
    inquirer
      .prompt({
        type: "list",
        message: "Which employee would you like to remove?",
        name: "remove",
        choices: renderEmployeeArray(data),
      })
      .then((res) => {
        let employeeID;
        for (let i = 0; i < data.length; i++) {
          if (data[i].first_name + " " + data[i].last_name === res.remove) {
            employeeID = data[i].id;
          }
        }
        connection.query(
          "DELETE FROM employee WHERE id = ?",
          [employeeID],
          (err, res) => {
            if (err) throw err;
            console.log(res);
            initialQuestion();
          }
        );
      })
      .catch((err) => {
        if (err) throw err;
      });
  });
}

function editEmployee () {
  console.log("Edit Employee")
  // TODO: ADD FUNCTION
}

// update the role of an employee
function updateRole() {
  console.log("Update Employee Role");
  connection.query("SELECT * FROM employee", (err, data) => {
    if (err) throw err;
    inquirer
      .prompt({
        type: "list",
        message: "Which employee would you like to update the role for?",
        name: "updateRoleEmp",
        choices: renderEmployeeArray(data),
      })
      .then((res) => {
        let employeeID;
        for (let i = 0; i < data.length; i++) {
          if (
            data[i].first_name + " " + data[i].last_name ===
            res.updateRoleEmp
          ) {
            employeeID = data[i].id;
          }
        }
        connection.query("SELECT * FROM roles", (err, data) => {
          if (err) throw err;
          inquirer
            .prompt({
              type: "list",
              message: "What role would you like to give them?",
              name: "role",
              choices: renderRoleArray(data),
            })
            .then((res) => {
              let roleID;
              for (let i = 0; i < data.length; i++) {
                if (data[i].title === res.role) {
                  roleID = data[i].id;
                }
              }
              connection.query(
                "UPDATE employee SET role_id = ? WHERE id = ?",
                [roleID, employeeID],
                (err, res) => {
                  if (err) throw err;
                  console.log(res);
                  initialQuestion();
                }
              );
            })
            .catch((err) => {
              if (err) throw err;
            });
        });
      })
      .catch((err) => {
        if (err) throw err;
      });
  });
}

// update the manager of an employee
function updateManager() {
  console.log("Update Employee Manager");
  connection.query("SELECT * FROM employee", (err, data) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which employee would you like to update the manager for?",
          name: "employee",
          choices: renderEmployeeArray(data),
        },
        {
          type: "list",
          message: "Which employee would you like to make their manager?",
          name: "manager",
          choices: renderEmployeeArray(data),
        },
      ])
      .then((res) => {
        let employeeID;
        let managerID;
        for (let i = 0; i < data.length; i++) {
          if (data[i].first_name + " " + data[i].last_name === res.employee) {
            employeeID = data[i].id;
          }
          if (data[i].first_name + " " + data[i].last_name === res.manager) {
            managerID = data[i].id;
          }
        }
        connection.query(
          "UPDATE employee SET manager_id = ? WHERE id = ?",
          [managerID, employeeID],
          (err, res) => {
            if (err) throw err;
            console.log(res);
            initialQuestion();
          }
        );
      })
      .catch((err) => {
        if (err) throw err;
      });
  });
}

function addDepartment () {
  console.log("Add Department")
  // TODO: ADD FUNCTION
}

function removeDepartment () {
  console.log("Remove Department")
  // TODO: ADD FUNCTION
}

function editDepartment () {
  console.log("Edit Department")
  // TODO: ADD FUNCTION
}

function viewAllDepartments () {
  console.log("View All Departments")
}

function addRole () {
  console.log("Add Role")
  // TODO: ADD FUNCTION
}

function removeRole () {
  console.log("Remove Role")
  // TODO: ADD FUNCTION
}

function editRole () {
  console.log("Edit Role")
  // TODO: ADD FUNCTION
}

// view a list of all roles
function viewAllRoles() {
  console.log("View All Roles");
  connection.query(
    `SELECT roles.id, roles.title, roles.salary, department.dept_name 
    FROM roles
    LEFT JOIN department ON roles.department_id = department.id`,
    (err, data) => {
      if (err) throw err;
      console.table(data);
    }
  );
}

function renderEmployeeArray(data) {
  const employeeArray = [];
  for (let i = 0; i < data.length; i++) {
    employeeArray.push(data[i].first_name + " " + data[i].last_name);
  }
  return employeeArray;
}

function renderRoleArray(data) {
  const roleArray = [];
  for (let i = 0; i < data.length; i++) {
    roleArray.push(data[i].title);
  }
  return roleArray;
}
