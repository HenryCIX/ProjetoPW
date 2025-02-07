var cadList = [];
var count = 1;
const hora = new Date();

function addCad(usuario, email) {
    var newCad = { id: count++, usuario: usuario, email: email, hora: hora};
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
        listItem.innerHTML = '<span class="cad-name"> ID: ' + cad.id + '</span> - Data: ' + cad.hora + ' - Usuário: ' + cad.usuario + ' - Email: ' + cad.email + ' <button class="btnDeletar" onclick="deleteCad(' + cad.id + ')">Excluir</button>';
        cadListElement.appendChild(listItem);
    });
}

document.getElementById('cadForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var usernameInput = document.getElementById('usernameInput');
    var emailInput = document.getElementById('emailInput');
    addCad(usernameInput.value, emailInput.value);
    usernameInput.value = '';
    emailInput.value = '';
});

// Limpar Campo
function btnLimparCad() {
    var usernameInput = document.getElementById('usernameInput');
    var emailInput = document.getElementById('emailInput');
    usernameInput.value = '';
    emailInput.value = '';
}

// Deletar um cadastro
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

// Deletar tudo
function deletarTodoCad() { 
    localStorage.clear();
    carregarCadList();
    var listaContainer = document.getElementById('cadList'); 
    listaContainer.innerHTML = '';
}

// Pesquisar

let btnPesquisar = document.querySelector("#btnPesquisar");
btnPesquisar.addEventListener("click", function () {
    var usernameInput = document.getElementById('usernameInput');
    var emailInput = document.getElementById('emailInput');
    var ListaCad = JSON.parse(localStorage.getItem('cadList')) || [];
    var listaContainer = document.getElementById('cadList'); 
    listaContainer.innerHTML = '';

    ListaCad.forEach(function (cad) {
        if (cad.usuario === usernameInput.value || cad.email === emailInput.value) {
            var listItem = document.createElement('li');
            listItem.innerHTML = '<span class="cad-name">ID: ' + cad.id + '</span> - Data: ' + cad.hora + ' - Usuário: ' + cad.usuario + ' - Email: ' + cad.email + 
            ' <button class="btnDeletar" onclick="deleteCad(' + cad.id + ')">Excluir</button>';
            listaContainer.appendChild(listItem);
        }
    });
});