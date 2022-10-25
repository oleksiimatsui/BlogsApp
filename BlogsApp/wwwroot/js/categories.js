var uri = 'api/Categories';
var hovered = 0;


function uploadAll() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayCategories(data))
        .catch(error => display_error(error));
}

function addCategory() {
    hidecreate();
    var addNameTextbox = document.getElementById('add-name');
    var category = {
        name: addNameTextbox.value.trim(),
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
        .then(response => response.json())
        .then(() => {
            uploadAll();
            addNameTextbox.value = '';
        })
        .catch(error => display_error(error));
}

function deleteCategory(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => uploadAll())
        .catch(error => display_error(error));
}

function updateCategory() {
    var categoryId = document.getElementById('edit-id').value;
    var category = {
        id: parseInt(categoryId, 10),
        name: document.getElementById('edit-name').value.trim(),
    };

    fetch(`${uri}/${categoryId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
        .then(() => uploadAll())
        .catch(error => display_error(error));

    hideedit();

    return false;
}



function redirect(id) {
    if (hovered == 1) return 0;
    window.location = "/Publications?Cat=" + id;
}

function sethover(){
    hovered = 1;
}
function removehover() {
    hovered = 0;
}

function _displayCategories(data) {
    var container = document.getElementById('container');
    container.innerHTML = '';
    var button = document.createElement('span');
    button.classList.add('link');
    button.setAttribute('onmouseover', `sethover()`);
    button.setAttribute('onmouseleave', `removehover()`);

    data.forEach(category => {
        let editButton = button.cloneNode(false);
        editButton.innerText = ' Редагувати ';
        editButton.setAttribute('onclick', `displayEditForm(${category.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = ' Видалити ';
        deleteButton.setAttribute('onclick', `deleteCategory(${category.id})`);

        let textNode = document.createTextNode(category.name);
        let box = document.createElement('div');
        box.classList.add('longdiv');
        box.setAttribute('onclick', `redirect(${category.id})`);

        let smalldiv = document.createElement('div');
        smalldiv.style.float = "right";

        container.appendChild(box);
        box.appendChild(textNode);
        box.appendChild(smalldiv);
        smalldiv.appendChild(editButton);
        smalldiv.appendChild(deleteButton);

    });

    elements = data;
}

