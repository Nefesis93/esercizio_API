let listaUtenti = new Map();
let prUsers = fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json());

document.addEventListener('DOMContentLoaded', function() {
    prUsers.then(obj => {
            //listaUtenti = obj;
            obj.forEach(o => {
                listaUtenti.set(o.id, o);
            });
            appendUtenti();
        })
        .catch(err => console.log(err));
});

function getSingleColumn(value) {
    let td = document.createElement("td");
    if (typeof(value) == 'object') {
        td.appendChild(value);
    } else {
        td.innerHTML = value;
    }
    return td;
}

function getButton(icon, className, f) {
    let button = document.createElement("button");
    button.className = className;
    button.appendChild(icon);
    button.addEventListener("click", f);
    return getSingleColumn(button);
}

function appendUtenti() {
    let tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    listaUtenti.forEach(utente => {
        let tr = document.createElement("tr");

        for (const key in utente) {
            if (key === "id" || key === "name" ||
                key === "username" || key === "phone") {
                tr.appendChild(getSingleColumn(utente[key]));
            }
        }

        let icon = document.createElement("i");
        icon.className = "bi bi-trash";
        tr.appendChild(getButton(icon, "btn btn-outline-danger", function() {
            let userID = parseInt(this.parentNode.parentNode.firstChild.innerHTML);
            listaUtenti.delete(userID);
            let prUserDelete = fetch('https://jsonplaceholder.typicode.com/users/' + userID, {
                    method: 'DELETE',
                })
                .then(response => {
                    if (response.ok !== true) {
                        console.log('errore durante la cancellazione dell\'utente');
                    }
                })
                .catch(err => console.log(err));
            appendUtenti();
        }));
        tbody.appendChild(tr);
    })
}