let signInFormDiv = document.getElementById('signInForm');
let signUpFormDiv = document.getElementById('signUpForm');
let signInForm = document.forms[0];
let signUpForm = document.forms[1];
signUpFormDiv.style.display = 'none';

function termsCheck() {
    if (signUpForm.terms.checked) {
        signUpForm.submitBtn.disabled = false;
    } else {
        signUpForm.submitBtn.disabled = true;
    }
}

signUpForm.submitBtn.onclick = function (event) {
    signInForm.style.display = "none";
    document.getElementById('profile').style.display = "block";
    document.getElementById('userName').innerText = `${signUpForm.firstName.value}` + ` ` + `${signUpForm.lastName.value}`;
    document.getElementById('email').innerText = `${signUpForm.myMail.value}`;
    document.getElementById('position').innerText = `${signUpForm.position.value}`;
}

function checkSex(type) {
    let avatar = document.getElementById('avatar');
    if (type === 'male') {
        avatar.src = 'images/dude-prof.svg';
    } else {
        avatar.src = 'images/fam-prof.svg';
    }
}

let signOutBtn = document.getElementById('signOut');
signOutBtn.addEventListener('click', function () {
    signUpForm.reset();
    document.getElementById('profile').style.display = "none";
    signInForm.style.display = "block";
})

let signUpLink = document.getElementsByClassName('registerNow')[0];
signUpLink.addEventListener('click', function (e) {
    e.preventDefault();
    signInFormDiv.style.display = 'none';
    signUpLink.style.display = 'none';
    signInLink.style.display = 'block';
    signUpFormDiv.style.display = 'block';
})
let signInLink = document.getElementsByClassName('loginNow')[0];
signInLink.addEventListener('click', function (e) {
    e.preventDefault();
    signUpFormDiv.style.display = 'none';
    signInLink.style.display = 'none';
    signUpLink.style.display = 'block';
    signInFormDiv.style.display = 'block';
})