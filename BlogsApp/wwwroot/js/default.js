var elements = [];

function displayEditForm(elementId) {
    if (document.getElementById('edit-form').style.display == 'block') {
        hideedit()
    } else {
        document.getElementById('edit-form').style.display = 'block';
        let element = elements.find(function (element) { return element.id === elementId });
        document.getElementById('edit-id').value = element.id;
        document.getElementById('edit-name').value = element.name;
        document.getElementById('edit-text').value = element.text;
        showedit();
    }
}

function displayCreateForm() {
    if (document.getElementById('create-form').style.display == 'block') {
        hidecreate()
    } else
        showcreate()
}

function hideedit(){
    document.getElementById('edit-form').style.display = 'none';
}
function showedit(){
    document.getElementById('edit-form').style.display = 'block';
}
function hidecreate(){
    document.getElementById('create-form').style.display = 'none';
}
function showcreate(){
    document.getElementById('create-form').style.display = 'block';
}

function display_error(error) {
    document.getElementById('errors').innerText = error;
}

