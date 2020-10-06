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
      console.log("\nEmployee Listing\n--------------------------------------");
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
      console.log(
        "\nEmployees by Department\n--------------------------------------"
      );
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
      console.log(
        "\nEmployees by Manager\n--------------------------------------"
      );
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
                (err) => {
                  if (err) throw err;
                  console.log(
                    `Success! ${firstName} ${lastName} was added to employees.`
                  );
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
          (err) => {
            if (err) throw err;
            console.log(res);
            console.log("Success! Employee was removed.");
            initialQuestion();
          }
        );
      })
      .catch((err) => {
        if (err) throw err;
      });
  });
}

function editEmployee() {
  console.log("Edit Employee");
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
      .then((response) => {
        let employeeID;
        for (let i = 0; i < data.length; i++) {
          if (
            data[i].first_name + " " + data[i].last_name ===
            response.updateRoleEmp
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
                (err) => {
                  if (err) throw err;
                  console.log(
                    `Success! ${response.updateRoleEmp}'s role was updated to ${res.role}.`
                  );
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
          (err) => {
            if (err) throw err;
            console.log(
              `Success! ${res.employee}'s manager was updated to ${res.manager}.`
            );
            initialQuestion();
          }
        );
      })
      .catch((err) => {
        if (err) throw err;
      });
  });
}

function addDepartment() {
  // console.log("Add Department");
  inquirer
    .prompt({
      type: "input",
      message: "What department would you like to add?",
      name: "newDeptName",
    })
    .then((res) => {
      connection.query(
        "INSERT INTO department (dept_name) VALUES (?)",
        [res.newDeptName],
        (err) => {
          if (err) throw err;
          console.log(`Success! ${res.newDeptName} was added to departments.`);
          initialQuestion();
        }
      );
    });
}

function removeDepartment() {
  // console.log("Remove Department");
  connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    inquirer
      .prompt({
        type: "list",
        message: "Which role would you like to remove?",
        name: "remove",
        choices: renderDepartmentArray(data),
      })
      .then((res) => {
        connection.query(
          "DELETE FROM department WHERE dept_name = ?",
          [res.remove],
          (err) => {
            if (err) throw err;
            console.log("Success! Department was removed.");
            initialQuestion();
          }
        );
      })
      .catch((err) => {
        if (err) throw err;
      });
  });
}

function editDepartment() {
  // console.log("Edit Department");
  connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which department would you like to edit?",
          name: "editedDept",
          choices: renderDepartmentArray(data),
        },
        {
          type: "input",
          message: "What would you like to change the department name to?",
          name: "deptName",
        },
      ])
      .then((res) => {
        connection.query(
          "UPDATE department SET dept_name = ? WHERE dept_name = ?",
          [res.deptName, res.editedDept],
          (err) => {
            if (err) throw err;
            console.log(`${res.editedDept} was updated to ${res.deptName}.`);
            initialQuestion();
          }
        );
      });
  });
}

function viewAllDepartments() {
  // console.log("View All Departments")
  connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    console.log("\nDepartment Listing\n--------------------------------------");
    console.table(data);
    initialQuestion();
  });
}

function addRole() {
  // console.log("Add Role");
  connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          message: "What role would you like to add?",
          name: "newRoleTitle",
        },
        {
          type: "input",
          message: "What is the salary for this new role?",
          name: "newRoleSalary",
        },
        {
          type: "list",
          message: "What department does this new role belong to?",
          name: "newRoleDept",
          choices: renderDepartmentArray(data),
        },
      ])
      .then((res) => {
        let departmentID;
        for (let i = 0; i < data.length; i++) {
          if (data[i].dept_name === res.newRoleDept) {
            departmentID = data[i].id;
          }
        }
        connection.query(
          "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
          [res.newRoleTitle, res.newRoleSalary, departmentID],
          (err) => {
            if (err) throw err;
            console.log(`Success! ${res.newRoleTitle} was added to roles.`);
            initialQuestion();
          }
        );
      })
      .catch((err) => {
        if (err) throw err;
      });
  });
}

function removeRole() {
  // console.log("Remove Role");
  connection.query("SELECT * FROM roles", (err, data) => {
    if (err) throw err;
    inquirer
      .prompt({
        type: "list",
        message: "Which role would you like to remove?",
        name: "remove",
        choices: renderRoleArray(data),
      })
      .then((res) => {
        connection.query(
          "DELETE FROM roles WHERE title = ?",
          [res.remove],
          (err) => {
            if (err) throw err;
            console.log("Success! Role was removed.");
            initialQuestion();
          }
        );
      })
      .catch((err) => {
        if (err) throw err;
      });
  });
}

function editRole() {
  // console.log("Edit Role");
  connection.query("SELECT * FROM roles", (err, data) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which role would you like to edit?",
          name: "editedRole",
          choices: renderRoleArray(data),
        },
        {
          type: "list",
          message: "Would you like to update the title?",
          name: "titleChange",
          choices: ["Yes", "No"],
        },
        {
          type: "input",
          message: "What would you like the new title to be?",
          name: "title",
          when: (answers) => answers.titleChange === "Yes",
        },
        {
          type: "list",
          message: "Would you like to update the salary?",
          name: "salaryChange",
          choices: ["Yes", "No"],
        },
        {
          type: "input",
          message: "What would you like the new salary to be?",
          name: "salary",
          when: (answers) => answers.salaryChange === "Yes",
        },
      ])
      .then((response) => {
        connection.query("SELECT * FROM department", (err, data) => {
          if (err) throw err;
          inquirer
            .prompt([
              {
                type: "list",
                message: "Would you like to update the department?",
                name: "departmentChange",
                choices: ["Yes", "No"],
              },
              {
                type: "list",
                message: "What would you like the new department to be?",
                name: "department",
                choices: renderDepartmentArray(data),
                when: (answers) => answers.departmentChange === "Yes",
              },
            ])
            .then((res) => {
              if (
                response.titleChange === "No" &&
                response.salaryChange === "No" &&
                res.departmentChange === "No"
              ) {
                console.log(`No changes made to ${response.editedRole}.`);
                initialQuestion();
              } else {
                if (response.salaryChange === "Yes") {
                  connection.query(
                    "UPDATE roles SET salary = ? WHERE title = ?",
                    [response.salary, response.editedRole],
                    (err) => {
                      if (err) throw err;
                      console.log(
                        `Salary was updated for ${response.editedRole}`
                      );
                    }
                  );
                }
                if (res.departmentChange === "Yes") {
                  let newDeptID;
                  for (let i = 0; i < data.length; i++) {
                    if (data[i].dept_name === res.department) {
                      newDeptID = data[i].id;
                    }
                  }
                  connection.query(
                    "UPDATE roles SET department_id = ? WHERE title = ?",
                    [newDeptID, response.editedRole],
                    (err) => {
                      if (err) throw err;
                      console.log(
                        `Department was updated for ${response.editedRole}`
                      );
                    }
                  );
                }
                if (response.titleChange === "Yes") {
                  connection.query(
                    "UPDATE roles SET title = ? WHERE title = ?",
                    [response.title, response.editedRole],
                    (err) => {
                      if (err) throw err;
                      console.log(
                        `Title was updated for ${response.editedRole}`
                      );
                    }
                  );
                }
              }
              // TODO: fix async issues
              return initialQuestion();
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

// view a list of all roles
function viewAllRoles() {
  // console.log("View All Roles");
  connection.query(
    `SELECT roles.id, roles.title, roles.salary, department.dept_name 
    FROM roles
    LEFT JOIN department ON roles.department_id = department.id`,
    (err, data) => {
      if (err) throw err;
      console.log("\nRoles Listing\n--------------------------------------");
      console.table(data);
      initialQuestion();
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

function renderDepartmentArray(data) {
  const departmentArray = [];
  for (let i = 0; i < data.length; i++) {
    departmentArray.push(data[i].dept_name);
  }
  return departmentArray;
}
