// Initialize Firebase
var config = {
    apiKey: "AIzaSyCNco53BppZFpTImiWEFGy4SdcfVMdFovI",
    authDomain: "desafio4devs.firebaseapp.com",
    databaseURL: "https://desafio4devs.firebaseio.com",
    projectId: "desafio4devs",
    storageBucket: "desafio4devs.appspot.com",
    messagingSenderId: "1017913899554"
};
firebase.initializeApp(config);

// Mensagem em referencia a collection
var messagesRef = firebase.database().ref('Clientes');

//Dados do formulário
document.getElementById('contactform').addEventListener('submit', submitForm);

//Submit form
function submitForm(e) {
    e.preventDefault();

    //Pegar valores
    var nome = getInputVal('nome');
    var responsavel = getInputVal('responsavel');
    var data = getInputVal('data');

    //salvar mensagem
    saveMessage(nome, responsavel, data);

    //Show alert
    document.querySelector('.alert').style.display = 'block';

    //Hide alert depois de 3 segundos
    setTimeout(function () {
        document.querySelector('.alert').style.display = 'none';
    }, 3000);

    //limpar form
    document.getElementById('contactform').reset();

}

//Função para pegar o valor dos formularios
function getInputVal(id) {
    return document.getElementById(id).value;
}

//Salvar mensagem
function saveMessage(nome, responsavel, data) {
    var newMessagesRef = messagesRef.push();
    newMessagesRef.set({
        nome: nome,
        responsavel: responsavel,
        data: data
    });
}


//AVALIACAO
// Mensagem em referencia a collection
var messagesRef2 = firebase.database().ref('Avaliacoes');

//Dados do formulário
document.getElementById('formAvalia').addEventListener('submit', submitForm2);

//Submit form
function submitForm2(e) {
    e.preventDefault();

    //Pegar valores
    var mes = getInputVal('selectMes');
    var ano = getInputVal('selectAno');
    var cliente = getInputVal('select-client');
    var nota = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
    var motivo = getInputVal('motivo');

    //salvar mensagem
    saveMessage2(mes, ano, cliente, nota, motivo);

    //Show alert
    document.querySelector('.alertt').style.display = 'block';

    //Hide alert depois de 3 segundos
    setTimeout(function () {
        document.querySelector('.alertt').style.display = 'none';
    }, 3000);

    //limpar form
    document.getElementById('formAvalia').reset();

}

//Salvar mensagem
function saveMessage2(mes, ano, cliente, nota, motivo) {
    var newMessagesRef2 = messagesRef2.push();
    newMessagesRef2.set({
        mes: mes,
        ano: ano,
        cliente: cliente,
        nota: nota,
        motivo: motivo
    });
}

var nomes = [];
var responsaveis = [];
var cadastro = [];
var fireid = [];

firebase.database().ref('/Clientes/').on('value', function (snapshot) {
    snapshot.forEach(element => {
        nomes.push(element.val().nome);
        responsaveis.push(element.val().responsavel);
        cadastro.push(element.val().data);
        fireid.push(element.key);
    });
})

var n = fireid.length;
console.log(n);

var i = 0;
var tableFirebase = document.getElementById("tableFirebase");

for(i= 0; i < n; i++){
    var tr = "<tr>"+
    "<td>" + nomes[i] + "</td>" +
    "<td>" + responsaveis[i] + "</td>" +
    "<td>" + cadastro[i] + "</td>" +
    "</tr>";
    tableFirebase.innerHTML += tr;
}

var tr = tableFirebase.childNodes;
