INSERT INTO department (name)
VALUES
('Accounting'),
('Marketing'),
('Human Resources')
;

INSERT INTO role (title, salary, department_id)
VALUES
-- how to make salary into a usable amount (???)
    ('Manager', 50000, 3),
    ('Assistant', 30000, 1),
    ('Salesman', 35000, 2)
;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Bertha', 'Jorkins', 4, 2),
    ('Mathilda', 'Bagshot', 3, 1),
    ('Wilber', 'Wilkinson', 2, 1)
;