var id;
var categ;
var user;
var curi;
var uri = 'api/Publications';

function uploadAll() {
    id = getParam('Cat');
    curi = 'api/Categories/' + id;
    fetch(curi)
        .then(response => response.json())
        .then(data => _displayPublications(data))
        .catch(error => display_error(error));
}

function getParam(param) {
    var queryString = window.location.search.substring(1);
    var urlParams = new URLSearchParams(queryString);
    var res = urlParams.get(param);
    return res;
}

function _displayPublications(data) {

    var span = document.getElementById('catName');
    span.innerHTML = data.name;
    categ = data;

    var container = document.getElementById('container');
    container.innerHTML = '';
    var button = document.createElement('span');
    button.classList.add('link');
    button.setAttribute('onmouseover', `sethover()`);
    button.setAttribute('onmouseleave', `removehover()`);

    data.publications.forEach(publication => {
        let editButton = button.cloneNode(false);
        editButton.innerText = ' Редагувати ';
        editButton.setAttribute('onclick', `displayEditForm(${publication.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = ' Видалити ';
        deleteButton.setAttribute('onclick', `deletePublication(${publication.id})`);

        let textNode = document.createTextNode(publication.name);
        let box = document.createElement('div');
        box.title = publication.text;
        box.classList.add('longdiv');
        box.setAttribute('onclick', `redirect(${publication.id})`);

        let smalldiv = document.createElement('div');
        smalldiv.style.float = "right";

        container.appendChild(box);
        box.appendChild(textNode);
        box.appendChild(smalldiv);
        smalldiv.appendChild(editButton);
        smalldiv.appendChild(deleteButton);
    });

    elements = data.publications;
}



function addPublication(){
    hidecreate();
    var addNameTextbox = document.getElementById('add-name');
    var addTextTextbox = document.getElementById('add-text');

    var publication = {
        categoryId: id,
        name: addNameTextbox.value.trim(),
        text: addTextTextbox.value.trim(),
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(publication)
    })
        .then(response => response.json())
        .then(() => {
            uploadAll();
            addNameTextbox.value = '';
            addTextTextbox.value = '';
        })
        .catch(error => display_error(error));

}

function deletePublication(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => uploadAll())
        .catch(error => display_error(error));
}


function updatePublication() {
    var publicationId = document.getElementById('edit-id').value;
    var publication= {
        id: parseInt(publicationId, 10),
        categoryId: id,
        name: document.getElementById('edit-name').value.trim(),
        text: document.getElementById('edit-text').value.trim(),
    };

    fetch(`${uri}/${publicationId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(publication)
    })
        .then(() => uploadAll())
        .catch(error => display_error(error));

    hideedit();

    return false;
}