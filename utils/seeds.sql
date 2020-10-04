DROP DATABASE IF EXISTS employeesDB;
CREATE DATABASE employeesDB;

USE employeesDB;

CREATE TABLE department (
    dept_id INT NOT NULL,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(dept_id)
);

CREATE TABLE roles (
    role_id INT NOT NULL,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (role_id)
);

CREATE TABLE employee (
    emp_id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL
    manager_id INT NULL,
    PRIMARY KEY (emp_id)
);