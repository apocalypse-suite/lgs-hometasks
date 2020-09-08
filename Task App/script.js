let tBody = getById('tableBody');
let form = document.forms.myform;
let createTaskBtn = getById('createTaskBtn');
let tasks = [];

function getById(id) {
    return document.querySelector(`#${id}`);
};

const createBtn = (name) => {
    let div = document.createElement('div');
    let btn = document.createElement('button');

    switch (name.toLowerCase()) {
        case 'edit': {
            btn.className = 'btn btn-primary';
            break;
        }
        case 'delete': {
            btn.className = "btn btn-danger";
            break;
        }
    }

    btn.innerText = name;
    return btn.outerHTML;
}

const formatDate = (date) => {
    let str = new Date(date).toLocaleString();
    let arr = str.split(',');
    let div = document.createElement('div');
    let newArr = arr.map(item => {
        let span = document.createElement('span');
        span.innerHTML = item;
        return span.outerHTML;
    });

    str = newArr.join('<br>');
    return str;
}

createTaskBtn.addEventListener('click', (event) => {
    const task = {
        index: 1,
        name: form.name.value,
        start: formatDate(form.start.value),
        to: formatDate(form.end.value),
        status: 'In Progress',
        edit: createBtn('Edit'),
        delete: createBtn('Delete')
    };

    let tr = document.createElement('tr');
    for (let key in task) {
        let td = document.createElement('td');
        td.innerHTML = task[key];
        tr.append(td);
    }
    tBody.append(tr);
    form.reset();
});

(function () {
    $('form input').on("keyup change", function () {
        var empty = false;
        $('form input').each(function () {
            if ($(this).val() == '') {
                empty = true;
            }
        });
        if (empty) {
            $('#createTaskBtn').attr('disabled', 'disabled');
        } else {
            $('#createTaskBtn').removeAttr('disabled');
        }
    });
})();