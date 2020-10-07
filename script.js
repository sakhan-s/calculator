const numbers = document.querySelectorAll('.number-btn');
const operations = document.querySelectorAll('.operator-btn');
const square = document.getElementById('.square-btn');
const clearBtns = document.querySelectorAll('.clear-btn');
const decimalBtn = document.getElementById('decimal');
const result = document.getElementById('result');
const display = document.getElementById('display');
let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';
for (var i = 0; i < numbers.length; i++) {
    var number = numbers[i];
    number.addEventListener('click', function(e) {
        numberPress(e.target.textContent);
    });
}

for (var i = 0; i < operations.length; i++) {
    var operationBtn = operations[i];
    operationBtn.addEventListener('click', function(e) {
        operationPress(e.target.textContent);
    });
}

const deleteBtn = document.querySelector('.clear-btn[operator=clear-all]');
deleteBtn.addEventListener('click', () => clear());

const clearBtn = document.querySelector('.clear-btn[operator=remove-symbol]');
clearBtn.addEventListener('click', () => removeSymbol());

decimalBtn.addEventListener('click', () => decimal());

function numberPress(number) {
    if (MemoryNewNumber) {
        display.value = number;
        MemoryNewNumber = false;
    } else {
        if (display.value === '0') {
            display.value = number;
        } else {
            display.value += number;
        }
    }
}

function operationPress(op) {
    let localOperationMemory = display.value;

    if (MemoryNewNumber && MemoryPendingOperation !== '=') {
        display.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
        if (MemoryPendingOperation === '+') {
            MemoryCurrentNumber += +localOperationMemory;
        } else if (MemoryPendingOperation === '-') {
            MemoryCurrentNumber -= +localOperationMemory;
        } else if (MemoryPendingOperation === '*') {
            MemoryCurrentNumber *= +localOperationMemory;
        } else if (MemoryPendingOperation === '/') {
            MemoryCurrentNumber /= +localOperationMemory;
        } else if (MemoryPendingOperation === 'pow') {
            MemoryCurrentNumber **= +localOperationMemory;
        } else if (MemoryPendingOperation === 'sqr') {
            MemoryCurrentNumber = Math.sqrt(localOperationMemory);
        } else {
            MemoryCurrentNumber = +localOperationMemory;
        }
        display.value = MemoryCurrentNumber;
        MemoryPendingOperation = op;
    }
}

function decimal() {
    let localDecimalMemory = display.value;

    if (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        }
    }
    display.value = localDecimalMemory;
}

function clear() {
    display.value = '';
    MemoryNewNumber = true;
}

function removeSymbol() {
    display.value = display.value.slice(0, display.value.length - 1);
    MemoryNewNumber = false;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
}