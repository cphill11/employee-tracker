CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  -- hold department name
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (10,2) NOT NULL,
  department_id INTEGER,
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

-- first 2 tables work
CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NULL,
  INDEX role_ind (role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
  manager_id INTEGER NULL,
  CONSTRAINT fk_employee FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);