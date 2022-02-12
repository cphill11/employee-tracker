INSERT INTO parties (name, id)
VALUES
('Accounting', 1),
('Marketing', 2),
('Human Resources', 3)


INSERT INTO role (id, title, salary, department_id)
VALUES
-- how to make salary into a usable amount (???)
    (5.1, Manager, 'Salary', 3),
    (5.2, Slavelabor, 'free', 1),
    (5.3, Salesman, 'Way too much', 2)

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (5.1, Bertha, Jorkins, 1.1),
    (5.2, Mathilda, Bagshot, 2.2),
    (5.3, Wilber, Wilkinson, 3.3)