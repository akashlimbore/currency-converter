let display = document.getElementById('display');
let history = document.getElementById('history');
let memory = 0;
let expression = '';

function appendToDisplay(value) {
    if (display.innerText === '0' && value !== '.') {
        display.innerText = '';
    }
    expression += value;
    display.innerText = expression;
}

function clearAll() {
    expression = '';
    display.innerText = '0';
}

function calculate() {
    try {
        let result = eval(expression.replace('Math.PI', Math.PI));
        if (isNaN(result) || !isFinite(result)) {
            display.innerText = 'Error';
            expression = '';
            return;
        }
        history.innerHTML += `<div>${expression} = ${result}</div>`;
        display.innerText = result;
        expression = result.toString();
    } catch (e) {
        display.innerText = 'Error';
        expression = '';
    }
}

function scientificOperation(op) {
    try {
        let result;
        switch (op) {
            case 'sqrt':
                result = Math.sqrt(eval(expression));
                break;
            case 'sin':
                result = Math.sin(eval(expression) * Math.PI / 180);
                break;
            case 'cos':
                result = Math.cos(eval(expression) * Math.PI / 180);
                break;
            case 'tan':
                result = Math.tan(eval(expression) * Math.PI / 180);
                break;
            case 'pow':
                result = Math.pow(eval(expression), 2);
                break;
            case 'log':
                result = Math.log10(eval(expression));
                break;
        }
        if (isNaN(result) || !isFinite(result)) {
            display.innerText = 'Error';
            expression = '';
            return;
        }
        history.innerHTML += `<div>${op}(${expression}) = ${result}</div>`;
        display.innerText = result;
        expression = result.toString();
    } catch (e) {
        display.innerText = 'Error';
        expression = '';
    }
}

function memoryOperation(op) {
    try {
        switch (op) {
            case 'MC':
                memory = 0;
                break;
            case 'MR':
                display.innerText = memory;
                expression = memory.toString();
                break;
            case 'M+':
                memory += eval(expression);
                break;
            case 'M-':
                memory -= eval(expression);
                break;
        }
    } catch (e) {
        display.innerText = 'Error';
        expression = '';
    }
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/[0-9]/.test(key)) appendToDisplay(key);
    else if (key === '.') appendToDisplay('.');
    else if (key === '+' || key === '-' || key === '*' || key === '/') appendToDisplay(key);
    else if (key === 'Enter') calculate();
    else if (key === 'Escape') clearAll();
    else if (key === '(' || key === ')') appendToDisplay(key);
});