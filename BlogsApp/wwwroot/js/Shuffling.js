var uri = 'api/Publications';
var publications = [];

var state = document.getElementById("state");

var connection = new signalR.HubConnectionBuilder()
    .withUrl("/shufflingHub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

connection.start().then(
    function () {
        document.getElementById("connection").innerHTML = "connected";
    }).
    catch(function (err) {
        document.getElementById("connection").innerHTML = "connection error";
    });

function setListener() {
    let cats = document.querySelectorAll('.category');
    let pubs = document.querySelectorAll('.publication');
    cats.forEach(el => {
        el.addEventListener('dragover', (event) => allowDrop(event));
        el.addEventListener('drop', (event) => drop(event));
    });
    pubs.forEach(el => {
        el.addEventListener('dragstart', (event) => drag(event));
    });
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    connection.invoke("Drag", parseInt(ev.target.id)).catch(function (err) {
        return console.error(err.toString());
    });
}


function drop(ev) {
    ev.preventDefault();

    if (ev.target.classList.contains("category")) {
        var data = ev.dataTransfer.getData("text");
        connection.invoke("Drop", parseInt(data), parseInt(ev.target.id) ).catch(function (err) {
            return console.error(err.toString());
        });
    }
    
}

uploadAll();

connection.on("ReceiveDrop", function (pub, cat) {
    p = $(".publication").filter(function () {
        return $(this).attr("id") == pub;
    });
    c = $(".category").filter(function () {
        return $(this).attr("id") == cat;
    });
    p.removeClass("hide");
    console.log(p);
    console.log(c);
    c.append(p);
    publications.find(p => p.id == pub).categoryId = cat;
});

connection.on("ReceiveDrag", function (pub) {
    document.getElementById(pub).classList.add("hide");
});

connection.on("Count", function (count) {
    document.getElementById("count").innerHTML = count;
})

function uploadAll() {
    state.innerText = "loading...";
    curi = 'api/Categories/';
    fetch(curi)
        .then(response => response.json())
        .then(data => _displayAll(data))
        .catch(error => display_error(error));
}

function _displayAll(data) {
    state.innerText = "";
    document.getElementById("container").innerHTML = "";
    data.forEach(c => {
        let category = document.createElement("div");
        category.classList.add('category');
        category.id = c.id;
        let name = document.createElement("h1");
        name.textContent = c.name;
        category.appendChild(name);
        c.publications.forEach(p => {
            publications.push(p);
            let publication = document.createElement("div");
            publication.classList.add('publication');
            publication.innerText = p.name;
            publication.draggable = "true";
            publication.id = p.id;
            category.appendChild(publication);
        })
        document.getElementById("container").appendChild(category);
    })
    setListener();
}

window.onbeforeunload = function () {
    state.innerText = "saving...";
    publications.forEach(p => {
        fetch(`${uri}/${p.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(p)
        })
            .then(() => {
                state.innerText = "saved";
            })
            .catch(error => display_error(error));
    })
}