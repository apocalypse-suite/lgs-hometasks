let operations = {
    plus: function (a, b) {
        result = a + b;
    },
    subtract: function (a, b) {
        result = a - b;
    },
    multiply: function (a, b) {
        result = a * b;
    },
    divide: function (a, b) {
        result = a / b;
    }
}

function checkOp() {
    if (count > 0) {
        switch (operation) {
            case '+': {
                operations.plus(parseFloat(initNum), parseFloat(currentNum));
                break;
            }
            case '-': {
                operations.subtract(parseFloat(initNum), parseFloat(currentNum));
                break;
            }
            case '*': {
                operations.multiply(parseFloat(initNum), parseFloat(currentNum));
                break;
            }
            case '/': {
                operations.divide(parseFloat(initNum), parseFloat(currentNum));
                break;
            }
        }
        screen.innerText = result;
        initNum = result;
    } else initNum = currentNum;
}
let currentNum = '';
let result = '';
let btns = document.querySelectorAll('button');
let screen = document.querySelector('.screen');
let count = 0;
let operation;
let initNum;
let empty = true;

btns.forEach((item) => {
    item.addEventListener('click', () => {
        switch (item.className) {
            case 'number': {
                if (empty) {
                    screen.innerText = item.value;
                    currentNum = item.value;
                    empty = false;
                } else {
                    screen.innerText += item.value;
                    currentNum += item.value;
                }
                break;
            }
            case 'operator': {
                checkOp();
                count++;
                empty = true;
                operation = item.value;
                break;
            }
            case 'calculate': {
                checkOp();
                currentNum = initNum;
                count = 0;
                break;
            }
            case 'clear': {
                empty = true;
                currentNum = '0';
                screen.innerText = currentNum;
                count = 0;
                result = '';
                initNum = '';
                break;
            }
            case 'decimal': {
                screen.innerText += item.value;
                currentNum = currentNum + `.`;
                break;
            }
        }
    })
})