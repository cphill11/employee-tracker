//require connection

//classDB

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    // helper methods for querires
    findDepartments() {
        return this.connection.promise().query(
            'SELECT * FROM department'
        )
    }

}

module.exports = new DB(connection);