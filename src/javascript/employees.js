import faker from 'faker';

const employeesDepartments = ['IT', 'HR', 'Accountent', 'Engineer'];
const employeesArray = [];

function createEmployee() {
    const employeeDiv = document.createElement('div');
    employeeDiv.classList.add('employee__wrapper');

    let currentEmployeeDepartment = employeesDepartments[Math.floor(Math.random() * employeesDepartments.length)];
    let currentEmployeeName = faker.fake('{{name.firstName}} {{name.lastName}}');
    let currentEmployeeGender = faker.fake('{{name.gender}}');
    let currentEmployeeImage = faker.fake('{{image.avatar}}');

    employeeDiv.innerHTML = `
        <div class="image__wrapper">
            <img src="${currentEmployeeImage}" class="employee__image">
        </div>
        <div class="employee__wrapper">
            <h4 class="employee__name"> ${currentEmployeeName} </h4>
            <h4 class="employee__gender"> ${currentEmployeeGender} </h4>
            <h4 class="employee__department"> ${currentEmployeeDepartment} </h4>
        </div>
    `;

    employeesArray.add({
        name: currentEmployeeName,
        department: currentEmployeeDepartment,
        gender: currentEmployeeGender,
        image: currentEmployeeImage,
        node: employeeDiv,
    });
};

export function getEmployees(count = 50) {
    for (let i = 0; i < count; i++) {
        createEmployee();
    }

    return employeesArray;
}
