const inquirer = require('inquirer');
const cTable = require('console.table');
const MySQL = require('mysql2');

//require db folder
const getNewData = require('./db');
const DB = require('./db');

// retrieves methods from promise method pool from db/index.js
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
        }
    })
}

// After viewing the department, decide to either add a department or return to the directory

function departmentOrBack() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'departmentOrBack',
            message: 'Would you like to add a Department?',
            choices: [
                {
                    name: 'Add a Department.',
                    value: 'addDepartmentChoice',
                },
                {
                    name: 'Go back.',
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

// After viewing the employees, decide to either add an employee or return to the directory
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
            ]
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
// After viewing the roles, decide to either add a role or return to the directory
function roleOrBack() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'roleOrBack',
            message: 'Would you like to add a Role?',
            choices: [
                {
                    name: 'Add a Role',
                    value: 'addRoleChoice'
                },
                {
                    name: 'Go back',
                    value: 'back'
                }
            ]
        }
    ]).then((response) => {
        switch (response.roleOrBack) {
            case 'addRoleChoice':
                addRole();
                break;
            case 'back':
                directory();
        }
    })
};

// when viewing all departments, presents a formatted table showing department names and department ids
function viewDepartments() {
    getNewData.findDepartments()
    .then((departments) => {
        console.table(departments);
        departmentOrBack();
    })
}

// when adding a department, prompts the user to enter the name of the department and that department is added to the db
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDep',
            message: 'What department would you like to add?'
        }
    ]).then((answers) => {
        let department = {
            dep_name: answers.addDep
        }
        getNewData.addNewDepartment(department)
    }).then(() => {
        console.log('Added department to database!');
        directory();
    })
}

// when viewing all roles, presents the job title, role id, the department that role belongs to, and the salary for that role
function viewRoles() {
    getNewData.findRoles()
        .then((role) => {
            console.table(role);
            roleOrBack();
        })
}

// when adding a role, prompts the user to enter the name, salary, and department for the role and that role is added to the database
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addRole',
            message: 'What role would you like to add?'
        },
        {
            type: 'input',
            name: 'addSalary',
            message: 'How much salary does this role make?'
        }
    ]).then((roleSalaryAnswers) => {
        let title = roleSalaryAnswers.addRole
        let salary = roleSalaryAnswers.addSalary
        getNewData.findDepartments()
            .then((departments) => {
                const departmentOptions = departments.map(({ id, name }) => ({
                    name: name,
                    value: id
                }))
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'addRoleDep',
                        message: 'What department does this role belong to?',
                        choices: departmentOptions
                    }
                ]).then((answers) => {
                    let role = {
                        title: title,
                        salary: salary,
                        department_id: answers.addRoleDep
                    }
                    getNewData.addNewRole(role)
                    console.log("Added new role to the database");
                    directory();
                })
            })
    })
}

// when viewing all employees, presents a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that employees report to
function viewEmployees() {
    getNewData.findEmployees()
        .then((employees) => {
            console.table(employees);
            employeeOrBack();
        })
}

// when adding an employee, prompts the user to enter the employee's first name, last name, as well as manager, adding the employee to the database
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addEmployeeFirstName',
            message: 'What is the first name of the Employee?'
        },
        {
            type: 'input',
            name: 'addEmployeeLastName',
            message: 'What is the last name of the Employee?'
        }
    ]).then((answers) => {
        let first_name = answers.addEmployeeFirstName
        let last_name = answers.addEmployeeLastName
        getNewData.findRoles()
            .then((roles) => {
                const roleOptions = roles.map(({ id, title }) => ({
                    name: title,
                    value: id
                }))
            
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'addEmployeeRole',
                        message: 'What is the role of the Employee?',
                        choices: roleOptions
                    }
                ]).then((answers) => {
                    let roleID = answers.addEmployeeRole
                    getNewData.findEmployees()
                        .then((employees) => {
                            const managerOptions = employees.map(({ id, first_name, last_name }) => ({
                                name: first_name + ' ' + last_name,
                                value: id
                            }))
                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'addEmployeeManager',
                                    message: 'Who is the manager of the Employee?',
                                    choices: managerOptions
                                }
                            ]).then((answers) => {
                                let employee = {
                                    manager_id: answers.addEmployeeManager,
                                    role_id: roleID,
                                    first_name: first_name,
                                    last_name: last_name
                                }
                                getNewData.newEmployee(employee)
                            }).then(() => {
                                console.log("Added employee to the database!");
                                directory();
                            })
                        })
                })

            })
    })
}

// When updating an employee role, prompts the user to select an employee to update their new role and this information is updated in the database.

function updateEmployee() {
    getNewData.findEmployees()
        .then((employees) => {
            const updateOptions = employees.map(({ id, first_name, last_name }) => ({
                name: first_name + ' ' + last_name,
                value: id
            }))
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'updateEmployeeChoice',
                    message: 'Which employee would you like to update?',
                    choices: updateOptions
                }
            ]).then((emp_role) => {
                let empvar = {};
                for (let i = 0; i < employees.length; i++) {
                    if (employees[i].id == emp_role.updateEmployeeChoice) {
                        empvar = employees[i]
                    }
                }
                getNewData.findRoles()
                    .then((roles) => {
                        const roleOptions = roles.map(({ id, title }) => ({
                            name: title,
                            value: id
                        }))
                        inquirer.prompt([
                            {
                                type: 'list',
                                name: 'updateEmployeeRole',
                                message: 'What is their new role?',
                                choices: roleOptions
                            }
                        ]).then((answers) => {
                            let newRoleID = {
                                role_id: answers.updateEmployeeRole,
                                id: empvar.id
                            }
                            getNewData.updateEmployee(newRoleID)
                                .then(() => {
                                    console.log("Updated the employee in the database!");
                                    directory();
                                })
                        })
                    })

            })
        })
}

directory();