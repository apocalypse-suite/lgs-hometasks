let form = document.forms.form;
let btn = document.querySelector('#btn');

function checkNames(value) {
    const re = /^[A-Z][a-zA-Z '-]{5,20}$/;
    return re.test(value);
}

function checkReqexpEmail(value) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
}

function checkReqexpPhone(value) {
    let re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    return re.test(value);
}

function checkPass(value) {
    const re = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){6,}$/;
    console.log(value)
    return re.test(value);
}

function confirmPass(value) {
    let pcheck = document.getElementsByName('pass')[0].value;
    return value === pcheck;
}

function writeIncorrectMsg(p, fieldName) {
    p.innerHTML += `${fieldName} is incorrect`;
}

const validateFormField = (element) => {
    let validateFunc;
    switch (element.name) {
        case 'email': {
            validateFunc = checkReqexpEmail;
            break;
        }
        case 'phone': {
            validateFunc = checkReqexpPhone;
            break;
        }
        case 'firstName':
        case 'lastName': {
            validateFunc = checkNames;
            break;
        }
        case 'pass': {
            validateFunc = checkPass;
            break;
        }
        case 'confPass': {
            validateFunc = confirmPass;
            break;
        }
    }

    let p = element.nextElementSibling;
    p.innerHTML = '';

    if (element.value === '') {
        p.innerHTML = `${element.name} is required`;
        element.classList.add('incorr');
        return;
    } else {
        if (!validateFunc(element.value)) {
            writeIncorrectMsg(p, element.name);
            element.classList.add('incorr');
            return;
        }
    }
    element.classList.remove('incorr');
    element.classList.add('corr');
}

[...form.elements].forEach((input) => {
    input.addEventListener('keyup', (event) => {
        validateFormField(event.target);
    });
});