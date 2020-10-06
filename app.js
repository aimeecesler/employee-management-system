// REQUIREMENTS
const inquirer = require("inquirer");
const mysql = require("mysql");

// VARIABLES
const employeeArray = [];
const roleArray = [];
const departmentArray = [];
const managerArray = [];

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
        "View All Departments",
        "View All Roles",
        "Add Employee",
        "Remove Employee",
        "Edit Employee",
        "Add Department",
        "Remove Department",
        "Edit Department",
        "Add Role",
        "Remove Role",
        "Edit Role",
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
  // console.log("Add Employee");
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
        message: "What is the last name of the employee you would like to add?",
        name: "last_name",
      },
      {
        type: "list",
        message: "What role will this employee have?",
        name: "role",
        choices: getRoleArray(),
      },
      {
        type: "list",
        message: "Who is this employee's manager?",
        name: "manager",
        choices: getManagerArray(),
      },
    ])
    .then((res) => {
      const firstName = res.first_name;
      const lastName = res.last_name;
      const roleID = res.role.id;
      const managerID = res.manager.id;
      // console.log(firstName, lastName, roleID, managerID);
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [firstName, lastName, roleID, managerID],
        (err, result) => {
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
}

// remove an employee from the database
function removeEmployee() {
  inquirer
    .prompt([
      // appears to be some sort of bug that won't let a dynamic list item be the first question?
      {
        type: "list",
        message: "Are you sure you would like to remove an employee?",
        name: "confirm",
        choices: ["Yes", "No"],
      },
      {
        type: "list",
        message: "Which employee would you like to remove?",
        name: "remove",
        choices: getEmployeeArray(),
      },
    ])
    .then((res) => {
      let employeeID = res.remove.id;
      connection.query(
        "DELETE FROM employee WHERE id = ?",
        [employeeID],
        (err, result) => {
          if (err) throw err;
          console.log(
            `Success! ${res.remove.first_name} ${res.remove.last_name} was removed.`
          );
          initialQuestion();
        }
      );
    })
    .catch((err) => {
      if (err) throw err;
    });
}

function editEmployee() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Are you sure you would like to edit an employee?",
        name: "confirm",
        choices: ["Yes", "No"],
      },
      {
        type: "list",
        choices: getEmployeeArray(),
        message: "Which employee would you like to edit?",
        name: "employeeToEdit",
      },
      {
        type: "checkbox",
        message: "Select all items you would like to update for this employee.",
        name: "itemsToChange",
        choices: ["First Name", "Last Name", "Role", "Manager"],
      },
      {
        type: "input",
        message: "What would you like their new first name to be?",
        name: "firstName",
        when: (answer) => answer.itemsToChange.includes("First Name"),
      },
      {
        type: "input",
        message: "What would you like their new last name to be?",
        name: "lastName",
        when: (answer) => answer.itemsToChange.includes("Last Name"),
      },
      {
        type: "list",
        message: "What would you like their new role to be?",
        name: "role",
        choices: getRoleArray(),
        when: (answer) => answer.itemsToChange.includes("Role"),
      },
      {
        type: "list",
        message: "Who would you like their new manager to be?",
        name: "manager",
        choices: getManagerArray(),
        when: (answer) => answer.itemsToChange.includes("Manager"),
      },
    ])
    .then((res) => {
      if (res.confirm === "No") {
        initialQuestion();
      } else {
        for (let i = 0; i < res.itemsToChange.length; i++) {
          if (res.itemsToChange[i] === "First Name") {
            connection.query(
              "UPDATE employee SET first_name = ? WHERE id = ?",
              [res.firstName, res.employeeToEdit.id],
              (err, result) => {
                console.log("First Name Updated");
              }
            );
          } else if (res.itemsToChange[i] === "Last Name") {
            connection.query(
              "UPDATE employee SET last_name = ? WHERE id = ?",
              [res.lastName, res.employeeToEdit.id],
              (err, result) => {
                console.log("Last Name Updated");
              }
            );
          } else if (res.itemsToChange[i] === "Role") {
            connection.query(
              "UPDATE employee SET role_id = ? WHERE id = ?",
              [res.role.id, res.employeeToEdit.id],
              (err, result) => {
                console.log("Role Updated");
              }
            );
          } else if (res.itemsToChange[i] === "Manager") {
            connection.query(
              "UPDATE employee SET manager_id = ? WHERE id = ?",
              [res.manager.id, res.employeeToEdit.id],
              (err, result) => {
                console.log("Manager Updated");
              }
            );
          }
        }
        initialQuestion();
      }
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
        (err, result) => {
          if (err) throw err;
          console.log(`Success! ${res.newDeptName} was added to departments.`);
          initialQuestion();
        }
      );
    });
}

function removeDepartment() {
  // console.log("Remove Department");
  inquirer
    .prompt([
      // appears to be some sort of bug that won't let a dynamic list item be the first question?
      {
        type: "list",
        message: "Are you sure you would like to remove a department?",
        name: "confirm",
        choices: ["Yes", "No"],
      },
      {
        type: "list",
        message: "Which role would you like to remove?",
        name: "remove",
        choices: getDepartmentArray(),
      },
    ])
    .then((res) => {
      connection.query(
        "DELETE FROM department WHERE id = ?",
        [res.remove.id],
        (err, result) => {
          if (err) throw err;
          console.log("Success! Department was removed.");
          initialQuestion();
        }
      );
    })
    .catch((err) => {
      if (err) throw err;
    });
}

function editDepartment() {
  // console.log("Edit Department");
  inquirer
    .prompt([
      {
        type: "list",
        message: "Are you sure you would like to edit a department?",
        name: "confirm",
        choices: ["Yes", "No"],
      },
      {
        type: "list",
        message: "Which department would you like to edit?",
        name: "editedDept",
        choices: getDepartmentArray(),
      },
      {
        type: "input",
        message: "What would you like to change the department name to?",
        name: "deptName",
      },
    ])
    .then((res) => {
      connection.query(
        "UPDATE department SET dept_name = ? WHERE id = ?",
        [res.deptName, res.editedDept.id],
        (err, result) => {
          if (err) throw err;
          console.log(
            `${res.editedDept.dept_name} was updated to ${res.deptName}.`
          );
          initialQuestion();
        }
      );
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
        choices: getDepartmentArray(),
      },
    ])
    .then((res) => {
      let departmentID = res.newRoleDept.id;
      connection.query(
        "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
        [res.newRoleTitle, res.newRoleSalary, departmentID],
        (err, result) => {
          if (err) throw err;
          console.log(`Success! ${res.newRoleTitle} was added to roles.`);
          initialQuestion();
        }
      );
    })
    .catch((err) => {
      if (err) throw err;
    });
}

function removeRole() {
  // console.log("Remove Role");
  inquirer
    .prompt([
      {
        type: "list",
        message: "Are you sure you would like to remove a role?",
        name: "confirm",
        choices: ["Yes", "No"],
      },
      {
        type: "list",
        message: "Which role would you like to remove?",
        name: "remove",
        choices: getRoleArray(),
      },
    ])
    .then((res) => {
      connection.query(
        "DELETE FROM roles WHERE id = ?",
        [res.remove.id],
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
}

function editRole() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Are you sure you would like to edit a role?",
        name: "confirm",
        choices: ["Yes", "No"],
      },
      {
        type: "list",
        message: "Which role would you like to edit?",
        name: "roleToEdit",
        choices: getRoleArray(),
      },
      {
        type: "checkbox",
        message: "Select all items you would like to edit for this role.",
        name: "itemsToEdit",
        choices: ["Title", "Salary", "Department"],
      },
      {
        type: "input",
        message: "What would you like the new title to be?",
        name: "title",
        when: (answer) => answer.itemsToEdit.includes("Title"),
      },
      {
        type: "input",
        message: "What would you like the new salary to be?",
        name: "salary",
        when: (answer) => answer.itemsToEdit.includes("Salary"),
      },
      {
        type: "list",
        message: "What would you like the new department to be?",
        name: "department",
        choices: getDepartmentArray(),
        when: (answer) => answer.itemsToEdit.includes("Department"),
      },
    ])
    .then((res) => {
      if (res.conirm === "No") {
        initialQuestion();
      } else {
        for (let i = 0; i < res.itemsToEdit.length; i++) {
          if (res.itemsToEdit[i] === "Title") {
            connection.query(
              "UPDATE roles SET title = ? WHERE id = ?",
              [res.title, res.roleToEdit.id],
              (err, result) => {
                console.log("Title Updated");
              }
            );
          } else if (res.itemsToEdit[i] === "Salary") {
            connection.query(
              "UPDATE roles SET salary = ? WHERE id = ?",
              [res.salary, res.roleToEdit.id],
              (err, result) => {
                console.log("Salary Updated");
              }
            );
          } else if (res.itemsToEdit[i] === "Department") {
            connection.query(
              "UPDATE roles SET department_id = ? WHERE id = ?",
              [res.department.id, res.roleToEdit.id],
              (err, result) => {
                console.log("Department Updated");
              }
            );
          } else {
            console.log("Error");
          }
        }
        initialQuestion();
      }
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

function getEmployeeArray() {
  connection.query(
    "SELECT id, first_name, last_name FROM employee",
    (err, data) => {
      if (err) throw err;
      for (let i = 0; i < data.length; i++) {
        let thisEmployee = {
          name: `${data[i].first_name} ${data[i].last_name}`,
          value: data[i],
        };
        employeeArray.push(thisEmployee);
      }
    }
  );
  return employeeArray;
}

function getRoleArray() {
  connection.query("SELECT id, title FROM roles", (err, data) => {
    if (err) throw err;
    for (let i = 0; i < data.length; i++) {
      let role = { name: data[i].title, value: data[i] };
      roleArray.push(role);
    }
  });
  return roleArray;
}

function getDepartmentArray() {
  connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    for (let i = 0; i < data.length; i++) {
      let department = { name: data[i].dept_name, value: data[i] };
      departmentArray.push(department);
    }
  });

  return departmentArray;
}

function getManagerArray() {
  connection.query(
    "SELECT id, first_name, last_name FROM employee",
    (err, data) => {
      if (err) throw err;
      for (let i = 0; i < data.length; i++) {
        let manager = {
          name: `${data[i].first_name} ${data[i].last_name}`,
          value: data[i],
        };
        managerArray.push(manager);
      }
      managerArray.push({ name: "No Manager", value: { id: null } });
    }
  );
  return managerArray;
}
