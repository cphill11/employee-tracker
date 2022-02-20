// use to sort resolve promises
const { resolve } = require('path/posix');

//require connection
const connection = require('./connection');

//database class functionality
class DB {
    constructor(connection) {
        this.connection = connection;
    }

    // method for department query 
    findDepartments() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM department', (error, data) => {
                resolve(data);
            })
        })
    }
    // method for employee query
    findEmployees() {
        return new Promise((resolve, reject) => {
            // table.column referenced AS simplified descriptor FROM tables LEFT JOIN
            this.connection.query('SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.title, role.salary, department.name AS department, manager.first_name AS manager_first, manager.last_name AS manager_last FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id',
                (error, data) => {
                    resolve(data);
                })
        })
    }
    // method to enable display of the roles table
    findRoles() {
        return new Promise ((resolve, reject) => {
            this.connection.query('SELECT INSERT role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id',
            (error, data) => {
                resolve(data);
            })
        })
    }

    // method to enable adding a new employee to the table
    addNewEmployee(employee) {
        return new Promise ((resolve, reject) => {
            this.connection.query('INSERT INTO employee SET ?', employee,
            (error, data) => {
                resolve(data);
            })
        })
    }
    
    // method to enable adding a new department to the table
    addNewDepartment(department) {
        return new Promise ((resolve, reject) => {
            this.conneciton.query('INSERT INTO department SET ?', department,
            (error, data) => {
                resolve(data);
            })
        })
    }
    // method to add new role to table
    addNewRole(role) {
        return new Promise ((resolve, reject) => {
            this.connection.query('INSERT INTO role SET ?', role,
            (error, data) => {
                resolve(data);
            })
        })
    }

    // method to update the employee table
    updateEmployee(employee) {
        return new Promise ((resolve, reject) => {
            this.connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [employee.role_id, employee.id],
            (error, data) => {
                console.log(data);
                resolve(data);
            })
        })
    } 
}

module.exports = new DB(connection);