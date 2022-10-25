var categories = [];
var publications = [];


function load() {
    curi = 'api/Categories/';
    fetch(curi)
        .then(response => response.json())
        .then(data => _displayAll(data))
        .catch(error => display_error(error));
}

function _displayAll(data) {


}