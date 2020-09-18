let getID = function (id) {
    return document.getElementById(id);
};
let signInFormDiv = getID('signInForm');
let signInLink = document.getElementsByClassName('loginNow')[0];
let signUpFormDiv = getID('signUpForm');
let signUpLink = document.getElementsByClassName('registerNow')[0];
let signInForm = document.forms[0];
let signUpForm = document.forms[1];
let err = document.querySelector('.error');

function termsCheck() {
    signUpForm.terms.checked ? signUpForm.signUpBtn.disabled = false : signUpForm.signUpBtn.disabled = true;
}

let usersData = [];
signUpForm.signUpBtn.onclick = function () {

    let newUser = {
        email: getID('registeredMail').value,
        name: getID('registeredName').value,
        surname: getID('registeredSurname').value,
        password: getID('registeredPass').value,
        sex: document.querySelector('.check:checked').value,
        position: document.querySelector('.custom-select').value
    };
    usersData.push(newUser);
    console.log(usersData);
    localStorage.setItem('UsersLogin', JSON.stringify(usersData));
    signUpForm.reset();
    signUpForm.signUpBtn.disabled = true;
    window.location.reload();
}

let signOutBtn = getID('signOut');
signOutBtn.addEventListener('click', function () {
    signUpForm.reset();
    getID('profile').style.display = "none";
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
        signInInputs[i].value === '' ? showErr(true) : (showErr(false), login());
    }
}

function showErr(empty) {
    empty ? (err.style.display = 'block', err.innerText = 'Please, fill all the fields out') : err.style.display = 'none';
}

function login() {
    let loginMail = getID('loginMail').value;
    let loginPass = getID('loginPass').value;
    if (localStorage.getItem('UsersLogin')) {
        let allUsers = JSON.parse(localStorage.getItem('UsersLogin'))
        const matchedUser = allUsers.filter(user => {
            return loginMail === user.email && loginPass === user.password;
        })
        matchedUser.length ? showProfile(matchedUser) : (err.style.display = 'block', err.innerText = 'Wrong email or password');

        function showProfile() {
            signInFormDiv.style.display = "none";
            signUpLink.style.display = "none";
            getID('profile').style.display = "block";
            getID('userName').innerText = `${matchedUser[0].name}` + ` ` + `${matchedUser[0].surname}`;
            getID('email').innerText = `${matchedUser[0].email}`;
            getID('position').innerText = `${matchedUser[0].position}`;
            let avatar = getID('avatar');
            matchedUser[0].sex === 'male' ? avatar.src = 'images/dude-prof.svg' : avatar.src = 'images/fam-prof.svg';
        }
    } else {
        err.style.display = 'block';
        err.innerText = 'Empty localstorage';
    }
}
