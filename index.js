const cTable = require('console.table');
//require Inquirer
const inquirer = require('inquirer');

// require MySQL
const MySQL = require('mysql2');


//require db folder
const getNewData = require("./db")
// to do

//directory function (one inquirer prompt what to do; see readme for laundry list of things to do)
// bring in helper from db index.js

function directory() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'directoryChoice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View Department',
                    value: 'view_departments'
                },
                {
                    name: 'View Roles',
                    value: 'view_roles'
                },
                {
                    name: 'View Employees',
                    value: 'view_employees'
                },
                {
                    name: 'Quit',
                    value: 'quit'
                }
            ]
        }
    ]).then((response) => {
        switch (response.directoryChoice) {
            case 'view_employees':
                viewEmployees();
                break;
            case 'view_roles':
                viewRoles();
                break;
            case 'view_departments':
                viewDepartments();
                break;
            default:
                quit();
        }
    })
}

// After viewing the department, decide to either add a department or....... play hopscotch (?)
function departmentOrBack() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'departmentOrBack',
            message: 'Would you like to add a Department?',
            choices: [
                {
                name: 'Add a Department',
                value: 'addDepartmentChoice',
                },
                {
                    name: 'Go back',
                    value: 'back'
                }
            ]
        }
    ]).then((response) => {
        switch (response.departmentOrBack) {
            case 'addDepartmentChoice':
                addDepartment();
                break;
            case 'back':
                directory();
        }
    })
};

// After viewing the employees, decide to either add an employee or play hookie (???)
function employeeOrBack() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employeeOrBack',
            message: 'Would you like to add or update an Employee?',
            choices: [
                {
                    name: 'Add an Employee',
                    value: 'addEmployeeChoice'
                },
                {
                    name: 'Update an existing Employee',
                    value: 'updateEmployeeChoice'
                },
                {
                    name: 'Go back',
                    value: 'back'
                }
            ]).then((response) => {
                switch (response.employeeOrBack) {
                    case 'addEmployeeChoice':
                        addEmployee();
                        break;
                    case 'updateEmployeeChoice':
                        updateEmployee();
                        break;
                    case 'back':
                        directory();
                }
            })
        };