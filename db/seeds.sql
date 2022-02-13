INSERT INTO department (id, name)
VALUES
(1, 'Accounting'),
(2, 'Marketing'),
(3, 'Human Resources')


INSERT INTO role (id, title, salary, department_id)
VALUES
-- how to make salary into a usable amount (???)
    (4, 'Manager', 50000, 3),
    (3, 'Assistant', 30000, 1),
    (2, 'Salesman', 35000, 2)

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (51, 'Bertha', 'Jorkins', 4, 2),
    (52, 'Mathilda', 'Bagshot', 3, 1),
    (53, 'Wilber', 'Wilkinson', 2, 1)