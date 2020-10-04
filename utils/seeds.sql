DROP DATABASE IF EXISTS employeesDB;
CREATE DATABASE employeesDB;

USE employeesDB;

CREATE TABLE department (
    dept_id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(dept_id)
);

CREATE TABLE roles (
    role_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL NOT NULL,
    dept_id INT NOT NULL,
    PRIMARY KEY (role_id)
);

CREATE TABLE employee (
    emp_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT NULL,
    PRIMARY KEY (emp_id)
);

INSERT INTO department (dept_name) VALUES ("Management");
INSERT INTO department (dept_name) VALUES ("Sales");
INSERT INTO department (dept_name) VALUES ("Administrative");
INSERT INTO department (dept_name) VALUES ("Accounting");
INSERT INTO department (dept_name) VALUES ("Quality Control");
INSERT INTO department (dept_name) VALUES ("Supplier Relations");
INSERT INTO department (dept_name) VALUES ("Customer Relations");
INSERT INTO department (dept_name) VALUES ("Human Resources");












