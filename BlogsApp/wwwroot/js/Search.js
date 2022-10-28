
uploadAll(" ");

$("#submit").on("click", function () {
    let q = document.getElementById("query").value;
    uploadAll(q);
})

function uploadAll(query) {
    curi = 'api/Search/'+query;
    fetch(curi)
        .then(response => response.json())
        .then(data => _displayPublications(data))
        .catch(error => display_error(error));
}

function _displayPublications(data) {
    var res = document.getElementById("results");
    res.innerHTML = "";
    document.getElementById("errors").innerHTML="";
    data.forEach(publication => {
        let nameNode = document.createElement("h4");
        nameNode.textContent = publication.name;
        let textNode = document.createElement("p");
        textNode.innerHTML = publication.text;
        let box = document.createElement('div');
        box.title = publication.text;
        box.classList.add('longdiv');
        box.appendChild(nameNode);
        box.appendChild(textNode);
        res.appendChild(box);
    })
}