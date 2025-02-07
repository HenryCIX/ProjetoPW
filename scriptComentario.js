var cadList = [];
var count = 1;

function addCad( email, comentario) {
    var newCad = { id: count++, email: email, comentario: comentario};
    cadList.push(newCad);
    localStorage.setItem('cadList', JSON.stringify(cadList));
    carregarCadList();
}

// carregar lista de cadastro
function carregarCadList() {
    var cadListElement = document.getElementById('cadList');
    cadListElement.innerHTML = '';

    cadList.forEach(function (cad) {
        var listItem = document.createElement('li');
        listItem.innerHTML = '<span class="cad-name"> ID: ' + cad.id + '</span> - Email: ' + cad.email + ' - Comentario: ' + cad.comentario + ' <button class="btnDeletar" onclick="deleteCad(' + cad.id + ')">Excluir</button>';
        cadListElement.appendChild(listItem);
    });
}

document.getElementById('comentarioForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var email = document.getElementById('email');
    var coment = document.getElementById('comentario');
    addCad(email.value, coment.value);
});


// Deletar
function deleteCad(cadId) {
    var updatedCadList = cadList.filter(function (cad) {
        return cad.id !== cadId;
    });

    if (updatedCadList.length < cadList.length) {
        cadList = updatedCadList;
        localStorage.setItem('cadList', JSON.stringify(cadList));
        carregarCadList();
    } else {
        alert('Cadastro não encontrado.');
    }
}