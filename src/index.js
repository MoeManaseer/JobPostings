import faker from 'faker';

const employeesDepartments = ['IT', 'HR', 'Accountent', 'Engineer'];
const currentFilters = {};
const employeeAddStep = 10;

let currentEmployesLimit = 0;
let employeesWrapper;
let loadMoreButton;

const createEmployee = (index) => {
    const employeeDiv = document.createElement('div');
    employeeDiv.classList.add('employee__wrapper');

    if (index >= 10) {
        employeeDiv.classList.add('employee__wrapper--hidden');
    }

    let currentEmployeeDepartment = employeesDepartments[Math.floor(Math.random() * employeesDepartments.length)];
    let currentEmployeeName = faker.fake('{{name.firstName}} {{name.lastName}}');
    let currentEmployeeGender = faker.fake('{{name.gender}}');
    let currentEmployeeImage = faker.fake('{{image.avatar}}');

    employeeDiv.innerHTML = `
        <div class="employee__warpper--inner">
            <div class="image__wrapper">
                <img src="${currentEmployeeImage}" class="employee__image">
            </div>
            <div class="employee__data--wrapper">
                <h4 class="employee__name">${currentEmployeeName}</h4>
                <h4 class="employee__gender">${currentEmployeeGender}</h4>
                <h4 class="employee__department">${currentEmployeeDepartment}</h4>
            </div>
        </div>
    `;

    employeesWrapper.appendChild(employeeDiv);
};

const getEmployees = () => {
    for (let i = 0; i < 50; i++) {
        createEmployee(i);
    }

    // For some reason a text item is being added at the start of the container, so we remove it
    employeesWrapper.childNodes[0].remove();
}

const loadMoreEmployees = () => {
    for (let i = currentEmployesLimit; i < Math.min(currentEmployesLimit + employeeAddStep, employeesWrapper.childNodes.length); i++) {
        employeesWrapper.childNodes[i].classList.remove('employee__wrapper--hidden');
    } 

    if (currentEmployesLimit + employeeAddStep >= employeesWrapper.childNodes.length) {
        toggleLoadMoreButton(false);
    }
}

const loadFilteredEmployees = () => {
    const {
        department = '',
        name = '',
    } = currentFilters;

    let count = 0;

    for (let i = 0; i < employeesWrapper.childNodes.length; i++) {
        const currentEmployee = employeesWrapper.childNodes[i];
        const currentEmployeeName = currentEmployee.querySelector('.employee__name').textContent.toLowerCase();
        const currentEmployeeDepartment = currentEmployee.querySelector('.employee__department').textContent;

        if (currentEmployeeName.includes(name) && (!department || currentEmployeeDepartment === department) && count < currentEmployesLimit) {
            count++;
            currentEmployee.classList.remove('employee__wrapper--hidden');
        } else {
            currentEmployee.classList.add('employee__wrapper--hidden');
        }
    }

    toggleLoadMoreButton(!(count < currentEmployesLimit));
    updateEmployeesWrapper(count);
};

const updateEmployeesWrapper = (count) => {
    if (count) {
        employeesWrapper.classList.remove('employees__container--empty');
    } else {
        employeesWrapper.classList.add('employees__container--empty');
    }
};

const toggleLoadMoreButton = (value = true) => {
    loadMoreButton.classList.add(value ? 'employees__load-more-button--enabled' : 'employees__load-more-button--disabled');
    loadMoreButton.classList.remove(!value ? 'employees__load-more-button--enabled' : 'employees__load-more-button--disabled');
    loadMoreButton.disabled = !value;
};

document.addEventListener('DOMContentLoaded', () => {
    employeesWrapper = document.querySelector('.employees__container');
    getEmployees();

    loadMoreButton = document.querySelector('.employees__load-more-button');
    loadMoreButton.addEventListener('click', () => {
        const {
            department = '',
            name = '',
        } = currentFilters;

        currentEmployesLimit += employeeAddStep;
        const loadingFunction = name || department ? loadFilteredEmployees : loadMoreEmployees;
        loadingFunction();
    });

    const searchInputField = document.querySelector('.controls__search-input');
    searchInputField.addEventListener('input', (event) => {
        currentFilters.name = event.target.value.toLowerCase();
        currentEmployesLimit = employeeAddStep;
        loadFilteredEmployees();
    });
    
    const dropdownMenu = document.querySelector('.controls__dropdown-menu');
    dropdownMenu.addEventListener('change', (event) => {
        currentFilters.department = event.target.value; 
        currentEmployesLimit = employeeAddStep;
        loadFilteredEmployees();
    });
});