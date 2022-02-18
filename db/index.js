// use to sort resolve promises
const { resolve } = require('path/posix');

//require connection
const connection = require('./connection');

//classDB
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
                }
            )
        })
    }
    // displays roles table

    findRoles() {
        return new Promise ((resolve, reject) => {
            this.connection.query('SELECT')
        }) 
    }
}

module.exports = new DB(connection);