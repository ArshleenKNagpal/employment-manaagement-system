
insert into departments (name)
values  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Human Resources"),
        ("Legal"),
        ("Service");

insert into roles (title,salary,department_id)
values  ("Software Engineer",120000,2),
        ("Account Manager",160000,3),
        ("Accountant",125000,3),
        ("Legal Team Lead",250000,5),
        ("Lawyer",190000,5),
        ("Sales Lead",100000,1),
        ("Salesperson", 80000,1),
        ("Lead Engineer", 150000,2);

insert into employees (first_name,last_name,role_id,manager_id)
values  ("John","Doe",1,null),
        ("Mike","Chan",2,1),
        ("Ashley","Rodriguez",3,null),
        ("Kevin","Tupik",3,2),
        ("Kunal","Singh",5,null),
        ("Malia","Brown",5,2),
        ("Sarah","Lourd",7,null),
        ("Tom","Allen",8,7);
        
        
select * from departments;
