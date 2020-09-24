let btns = document.querySelectorAll('button');
let screen = document.querySelector('.screen');

let calcModule = (function () {
    const plus = (a, b) => result = a + b;
    const subtract = (a, b) => result = a - b;
    const multiply = (a, b) => result = a * b;
    const divide = (a, b) => result = a / b;

    return {
        plus,
        subtract,
        multiply,
        divide
    }
})();

let currentNum = '';
let result = '';
let count = 0;
let operation;
let initNum;
let empty = true;

function checkOp() {
    if (count > 0) {
        initNum = parseFloat(initNum);
        currentNum = parseFloat(currentNum);
        switch (operation) {
            case '+':
                calcModule.plus(initNum, currentNum);
                break;
            case '-':
                calcModule.subtract(initNum, currentNum);
                break;
            case '*':
                calcModule.multiply(initNum, currentNum);
                break;
            case '/':
                calcModule.divide(initNum, currentNum);
                break;
        }
        screen.innerText = result;
        initNum = result;
    } else initNum = currentNum;
}

btns.forEach((item) => {
    item.addEventListener('click', () => {
        switch (item.className) {
            case 'number':
                if (empty) {
                    screen.innerText = item.value;
                    currentNum = item.value;
                    empty = false;
                } else {
                    screen.innerText += item.value;
                    currentNum += item.value;
                }
                break;
            case 'operator':
                checkOp();
                count++;
                empty = true;
                operation = item.value;
                break;
            case 'calculate':
                checkOp();
                currentNum = initNum;
                count = 0;
                break;
            case 'clear':
                empty = true;
                currentNum = '0';
                screen.innerText = currentNum;
                count = 0;
                result = '';
                initNum = '';
                break;
            case 'decimal':
                screen.innerText += item.value;
                currentNum = currentNum + `.`;
                break;
        }
    })
})