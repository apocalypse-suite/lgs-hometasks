let formTwo = document.forms[0];

function termsCheck() {
    if (formTwo.terms.checked) {
        formTwo.submitBtn.disabled = false;
    } else {
        formTwo.submitBtn.disabled = true;
    }
}

formTwo.submitBtn.onclick = function (event) {
    document.getElementById('signInForm').style.display = "none";
    document.getElementById('profile').style.display = "block";
    document.getElementById('userName').innerText = `${formTwo.firstName.value}` + ` ` + `${formTwo.lastName.value}`;
    document.getElementById('email').innerText = `${formTwo.myMail.value}`;
    document.getElementById('position').innerText = `${formTwo.position.value}`;
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
    formTwo.reset();
    document.getElementById('profile').style.display = "none";
    document.getElementById('signInForm').style.display = "block";
})