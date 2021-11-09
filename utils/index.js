const inquirer = require("inquirer");


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
        console.table(employeesRole[0]);
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
        console.table(departmentsAdd[0]);
        index()
        break;

      default:
        process.exit();

    }
  }
  )
}

function viewEmployees(){
  console.log("viewEmployees");
  process.exit;
}

function addEmployees(){
  console.log("addEmployees");
  process.exit;
}
function updateEmployees(){
  console.log("updateEmployees");
  process.exit;
}
function viewRoleEmployees(){
  console.log("viewRoleEmployees");
  process.exit;
}
function roleEmployees(){
  console.log("roleEmployees");
  process.exit;
}
function allDepartments(){
  console.log("allDepartments");
  process.exit;
}
function addDepartments(){
  console.log("addDepartments");
  process.exit;
}

module.exports = index;
