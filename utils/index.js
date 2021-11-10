const inquirer = require("inquirer");
const { db } = require("../config/connection");

// Opening Question
const options = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "choices",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department"
    ],
  },
];

// Prompts - Navigation menu
const index = () => {
  inquirer.prompt(options).then(async (answer) => {
    const navigate = answer.choices;

    switch (navigate) {
      case "View All Employees":
        const employeesView = await viewEmployees();
        console.table(employeesView[0]);
        index()
        break;

      case "Add Employee":
        const employeesAdd = await addEmployees();
        const showEmployeesAdd = await viewEmployees();
        console.table(showEmployeesAdd[0]);
        index()
        break;

      case "Update Employee Role":
        const employeesUpdate = await updateEmployees();
        const showEmployeesUpdate = await viewEmployees();
        console.table(showEmployeesUpdate[0]);
        index()
        break;

      case "View All Roles":
        const employeesViewRole = await viewRoleEmployees();
        console.table(employeesViewRole[0]);
        index()
        break;

      case "Add Role":
        const employeesRole = await roleEmployees();
        const showEmployeesRole = await viewRoleEmployees();
        console.table(showEmployeesRole[0]);
        index()
        break;

      case "View All Departments":
        const departments = await allDepartments();
        console.table(departments[0]);
        index()
        break;

      case "Add Department":
        const departmentsAdd = await addDepartments();
        const showdepartmentsAdd = await allDepartments();
        console.table(showdepartmentsAdd[0]);
        index()
        break;

      default:
        process.exit();

    }
  }
  )
}

// View All Employees
function viewEmployees() {
  let query =

    `SELECT 
  distinct employees.id AS ID,
  employees.first_name AS First_Name,
  employees.last_name AS Last_Name,
  roles.title AS Title,
  departments.name AS Department,
  roles.salary AS Salary,
CONCAT(managers.first_name, " ", managers.last_name) AS Manager
FROM employees
INNER JOIN roles
ON employees.role_id = roles.id
INNER JOIN departments
ON roles.department_id = departments.id
LEFT OUTER JOIN employees AS Managers
ON employees.manager_id = managers.id
ORDER BY employees.id`;

  // let query = `
  //   select first_name, last_name, title, salary, name AS department_name
  //   from employee_db.employees
  //   join roles 
  //   on role_id = roles.id
  //   join departments
  //   on dept_id = departments.id`;

  return db.promise().query(query);
}

// Add Employees
function addEmployees() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "addEmployees",
        message: "What is the first name of the employee?",
      },
      {
        type: "input",
        name: "addEmployees1",
        message: "What is the last name of the employee?",
      },
      {
        type: "input",
        name: "addEmployees2",
        message: "What is the role ID of the role?",
      },
      {
        type: "input",
        name: "addEmployees3",
        message: "What is the manager ID of the role?",
      },

    ])
    .then((answer) => {
      const sql = `
                     insert into employees (first_name, last_name, role_id, manager_id)
                     values ("${answer.addEmployees}","${answer.addEmployees1}","${answer.addEmployees2}","${answer.addEmployees3}")`;
      db.promise().query(sql)
    })
}


// Update Employee Roles
function updateEmployees() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "updateEmployees",
        message: "Which employees' role do you want to update?",
      },
      {
        type: "input",
        name: "updateEmployees1",
        message: "Which role do you want to assign the selected employee?",
      },
    ])
    .then((answer) => {
      const sql = 
      `update employees set id "(${answer.updateEmployees})" where role_id="(${answer.updateEmployees1})"`

      db.promise().query(sql)
    })
}





// View All Roles
function viewRoleEmployees() {
  let query = "select distinct title from employee_db.roles";
  return db.promise().query(query);
}

// Add Role
function roleEmployees() {

  return inquirer
    .prompt([
      {
        type: "input",
        name: "roleEmployees",
        message: "What is the title of the role?",
      },
      {
        type: "input",
        name: "roleEmployees1",
        message: "What is the salary of the role?",
      },
      {
        type: "input",
        name: "roleEmployees2",
        message: "What is the deptartment ID of the role?",
      },
    ])

    .then((answer) => {
      const sql = `
                       insert into roles (title, salary, department_id)
                       values ("${answer.roleEmployees}","${answer.roleEmployees1}","${answer.roleEmployees2}")`;
      db.promise().query(sql)
    })
}


// View All Departments
function allDepartments() {
  let query = "select distinct name from employee_db.departments";
  return db.promise().query(query);
}

// Add Department
function addDepartments() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "addDepartments",
        message: "What is the name of the new department?",
      },
    ])
    .then((answer) => {
      const sql = `
                  insert into departments (name)
                  values ("${answer.addDepartments}")`;
      db.promise().query(sql)
    })
}

module.exports = index;


