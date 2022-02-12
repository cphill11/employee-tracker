DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;


CREATE TABLE department (
  -- hold department name
  name VARCHAR(30) NOT NULL
      -- didn't specify that it needs AUTO_INCREMENT
  id INTEGER PRIMARY KEY
);

CREATE TABLE role (
    -- didn't specify that it needs AUTO_INCREMENT
  id INTEGER PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (10,2) NOT NULL,
  department_id INTEGER NOT NULL
);

CREATE TABLE employee (
    -- didn't specify that it needs AUTO_INCREMENT
  id INTEGER PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  -- hold reference to employee role
  role_id INTEGER,
    -- make NULL if employee has no manager (HOW?)
  manager_id INTEGER
);