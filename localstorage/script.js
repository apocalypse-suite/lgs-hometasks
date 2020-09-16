let signInFormDiv = document.getElementById('signInForm');
let signInLink = document.getElementsByClassName('loginNow')[0];
let signUpFormDiv = document.getElementById('signUpForm');
let signUpLink = document.getElementsByClassName('registerNow')[0];
let signInForm = document.forms[0];
let signUpForm = document.forms[1];

function termsCheck() {
    signUpForm.terms.checked ? signUpForm.signUpBtn.disabled = false : signUpForm.signUpBtn.disabled = true;
}

let usersData = [];
signUpForm.signUpBtn.onclick = function () {

    let newUser = {
        email: document.getElementById('registeredMail').value,
        password: document.getElementById('registeredPass').value
    };
    usersData.push(newUser);
    console.log(usersData);
    localStorage.setItem('UsersLogin', JSON.stringify(usersData));
    signUpForm.reset();
    signUpForm.signUpBtn.disabled = true;
    // window.location.reload();
    // signUpFormDiv.style.display = "none";
    // signInLink.style.display = "none";
    // document.getElementById('profile').style.display = "block";
    // document.getElementById('userName').innerText = `${signUpForm.firstName.value}` + ` ` + `${signUpForm.lastName.value}`;
    // document.getElementById('email').innerText = `${signUpForm.myMail.value}`;
    // document.getElementById('position').innerText = `${signUpForm.position.value}`;
}

function checkSex(type) {
    let avatar = document.getElementById('avatar');
    type === 'male' ? avatar.src = 'images/dude-prof.svg' : avatar.src = 'images/fam-prof.svg';
}

let signOutBtn = document.getElementById('signOut');
signOutBtn.addEventListener('click', function () {
    signUpForm.reset();
    document.getElementById('profile').style.display = "none";
    signInForm.style.display = "block";
})

let links = document.querySelectorAll('.transferLink');
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", () => {
        switch (i) {
            case 0:
                signInFormDiv.style.display = 'none';
                signUpLink.style.display = 'none';
                signInLink.style.display = 'block';
                signUpFormDiv.style.display = 'block';
                break;
            case 1:
                signUpFormDiv.style.display = 'none';
                signInLink.style.display = 'none';
                signUpLink.style.display = 'block';
                signInFormDiv.style.display = 'block';
                break;
        }
    })
}

function checkFields(signInForm) {
    let signInInputs = signInForm.elements;
    for (let i = 0; i < signInInputs.length - 1; i++) {
        signInInputs[i].value === '' ? showErr(true) : showErr(false);
    }
}

function showErr(empty) {
    empty ? document.querySelector('.error').style.display = 'block' : document.querySelector('.error').style.display = 'none';
    // if (!empty) {
    //
    // }
}

