let expenses = [];

const typeExpenseSelect = document.querySelector('#type');
const form = document.querySelector('#form');
const descriptionInput = document.querySelector('#description');
const amountInput = document.querySelector('#amount');
const expenseList = document.querySelector('#expense-list');
const totalExpenses = document.querySelector('#total');

const expenseItem = {
    id: 0,
    description : '',
    amount : 0,
    type : ''
}

const typesExpenses = [
    { value: '', name: 'Select Type Expense' },
    { value: 'food', name: 'Food' },
    { value: 'transport', name: 'Transport' },
    { value: 'laundry', name: 'Laundry' }
]

//Events
document.addEventListener('DOMContentLoaded', () => {
    fillTypeExpense();
    descriptionInput.addEventListener('input', setExpense);
    amountInput.addEventListener('input', setExpense);
    typeExpenseSelect.addEventListener('change',  setExpense);
    expenseList.addEventListener('click', removeExpense);
    form.addEventListener('submit', addExpense);

});

function setExpense(e) {
    expenseItem[e.target.name] = e.target.name === 'amount' ? parseInt(e.target.value) : e.target.value;
}

function fillTypeExpense() {

    typesExpenses.forEach(type => {
        const option = document.createElement('option');
        option.value = type.value;
        option.textContent = type.name;
        typeExpenseSelect.appendChild(option);
    });
    
}

function addExpense(e) {
    e.preventDefault();
    const { description, amount, type} = expenseItem;
    const errorMessageDiv = document.getElementById('error-message');

    if(description === '' || parseInt(amount) <= 0 || type === '') {
       // Display error message
        errorMessageDiv.textContent = 'All fields are required';
        errorMessageDiv.classList.remove('hidden');
        // Quitar después de 5 segundos
        setTimeout(() => {
            errorMessageDiv.classList.add('hidden')
        }, 3000);
        return;
    }
   
   expenseItem.id = Date.now();

    expenses = [...expenses, {...expenseItem}];

    addExpenseToList(expenseItem);
    showTotalExpenses();
    resetExpense();
}

function resetExpense() {
    expenseItem.id = 0;
    expenseItem.description = '';
    expenseItem.amount = 0;
    expenseItem.type = '';
    form.reset();
}

function addExpenseToList(expense) {

    const { description, amount, type, id } = expense;
    const li = document.createElement('li');
    li.id = 'id'+id;
    li.classList.add('bg-white', 'shadow', 'rounded-lg', 'px-4', 'py-2', 'mb-2', 'flex', 'justify-between', 'items-center', 'w-full', 'max-w-md', 'expense-item');
    li.innerHTML = `
        <div>
            <h3 class="text-lg font-bold">${description}</h3>
            <p class="text-sm text-gray-500">${type}</p>
        </div>
        <div class="flex items-center">
            <span class="text-lg font-bold mr-4">$${amount}</span>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded delete-item" data-id="${id}" >
                Delete
            </button>
        </div>
    `;
    li.name = id;
    expenseList.appendChild(li);
}

function removeExpense(e) {
   
    if(e.target.classList.contains('delete-item')) {
        const expenseId = e.target.getAttribute('data-id');
        const parentElement = document.querySelector('#id'+expenseId);
        expenses = expenses.filter(expense => expense.id !== parseInt(expenseId));
        
        parentElement.remove();
        showTotalExpenses();
    }

}

function showTotalExpenses() {
    const total = expenses.reduce((total, expense) => total + expense.amount, 0.0);
    // Format the total amount as a currency string
    let formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    // Optional: You can specify additional options such as minimumFractionDigits
    }).format(total);
    totalExpenses.textContent = `${formattedTotal}`;
}
