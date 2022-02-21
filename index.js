const inquirer = require('inquirer');
const cTable = require('console.table');
const MySQL = require('mysql2');

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
                    name: 'View All Department',
                    value: 'view_departments'
                },
                {
                    name: 'View All Roles',
                    value: 'view_roles'
                },
                {
                    name: 'View All Employees',
                    value: 'view_employees'
                },
                {
                    name: 'Add a Department',
                    value: 'add_department'
                },
                {
                    name: 'Add a Role',
                    value: 'add_role'
                },
                {
                    name: 'Add an Employee',
                    value: 'add_employee'
                },
                {
                    name: 'Update Employee Role',
                    value: 'update_employee'
                },
                {
                    name: 'Quit',
                    value: 'quit'
                }
            ]
        }
    ]).then((response) => {
        switch (response.directoryChoice) {
            case 'view_departments':
                viewDepartments();
                break;
            case 'view_roles':
                viewRoles();
                break;
            case 'view_employees':
                viewEmployees();
                break;            
            case 'add_department':
                addDepartment();
                break;
            case 'add_role':
                addRole();
                break;
            case 'add_employee':
                addEmployee();
                break;
            case 'update_employee':
                updateEmployee();
                break;
        }
    })
}

// Department table initial functionality
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

// Employee table initial functionality
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

// Role table initial functionality
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

// Department table display functionality 
function viewDepartments() {
    getNewData.findDepartments()
    .then((departments) => {
        console.table(departments);
        departmentOrBack();
    })
}

// Add Department to db functionality 
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDep',
            message: 'Department to add: '
        }
    ]).then((answers) => {
        let department = {
            name: answers.addDep
        }
        getNewData.addNewDepartment(department)
    }).then(() => {
        console.log('Department added to database');
        directory();
    })
}

// Role table display functionality 
function viewRoles() {
    getNewData.findRoles()
        .then((role) => {
            console.table(role);
            roleOrBack();
        })
}

// Add Role to db functionality 
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addRole',
            message: 'Role to be added to database: '
        },
        {
            type: 'input',
            name: 'addSalary',
            message: 'Salary for this role: '
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
                    console.log('New role added to database');
                    directory();
                })
            })
    })
}

// Employee table display functionality 
function viewEmployees() {
    getNewData.findEmployees()
        .then((employees) => {
            console.table(employees);
            employeeOrBack();
        })
}

// Add employee to db functionality 
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addEmployeeFirstName',
            message: "Employee's first name: "
        },
        {
            type: 'input',
            name: 'addEmployeeLastName',
            message: "Employee's last name: "
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
                        message: "Employee's role: ",
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
                                    message: "Employee's Manager: ",
                                    choices: managerOptions
                                }
                            ]).then((answers) => {
                                let employee = {
                                    manager_id: answers.addEmployeeManager,
                                    role_id: roleID,
                                    first_name: first_name,
                                    last_name: last_name
                                }
                                getNewData.addNewEmployee(employee)
                            }).then(() => {
                                console.log('Employee added to database');
                                directory();
                            })
                        })
                })

            })
    })
}

// Update employee data functionality
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
            ]).then((role) => {
                let empvar = {};
                for (let i = 0; i < employees.length; i++) {
                    if (employees[i].id == role.updateEmployeeChoice) {
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
                                message: "Employee's new role: ",
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