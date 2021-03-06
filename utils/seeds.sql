-- DROP AND CREATE DATABASE AS NEEDED
DROP DATABASE IF EXISTS employeesDB;
CREATE DATABASE employeesDB;

-- USE THE EMPLOYEES DATABASE
USE employeesDB;

-- CREATE DEPARTMENT TABLE
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

-- CREATE ROLES TABLE
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (35) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

-- CREATE EMPLOYEE TABLE
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT NULL,
    -- manager_name VARCHAR(60) NULL,
    PRIMARY KEY (id)
);

-- CREATE DEPARTMENTS
INSERT INTO department (dept_name) VALUES ("Management");
INSERT INTO department (dept_name) VALUES ("Sales");
INSERT INTO department (dept_name) VALUES ("Administrative");
INSERT INTO department (dept_name) VALUES ("Accounting");
INSERT INTO department (dept_name) VALUES ("Quality Control");
INSERT INTO department (dept_name) VALUES ("Supplier Relations");
INSERT INTO department (dept_name) VALUES ("Customer Relations");
INSERT INTO department (dept_name) VALUES ("Human Resources");

-- CREATE ROLES
INSERT INTO roles (title, salary, department_id) VALUES ("Regional Manager", 100000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ("Assistant (to the) Regional Manager", 50000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ("Receptionist", 35000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ("Salesman", 80000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ("Lead Accountant", 80000, 4);
INSERT INTO roles (title, salary, department_id) VALUES ("Accountant", 50000, 4);
INSERT INTO roles (title, salary, department_id) VALUES ("Quality Control Officer", 50000, 5);
INSERT INTO roles (title, salary, department_id) VALUES ("Supplier Relations Manager", 50000, 6);
INSERT INTO roles (title, salary, department_id) VALUES ("Customer Relations Manager", 50000, 7);
INSERT INTO roles (title, salary, department_id) VALUES ("Head of Human Resources", 80000, 8);
INSERT INTO roles (title, salary, department_id) VALUES ("Intern", 20000, 3);

-- CREATE EMPLOYEES
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Michael", "Scott", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Dwight", "Schrute", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jim", "Halpert", 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Pam", "Beasley", 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Stanley", "Hudson", 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Phyllis", "Lapin", 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Andy", "Bernard", 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Angela", "Martin", 5, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Oscar", "Gutierrez", 6, 8);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Kevin", "Malone", 6, 8);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Creed", "Bratton", 7, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Meredith", "Palmer", 8, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Kelly", "Kapoor", 9, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Toby", "Flenderson", 10, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Ryan", "Howard", 11, 13);