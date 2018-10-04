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
        data: data,
        categoria: 'Nenhuma'
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
    var cliente = document.querySelector('input[name="checkclient"]:checked').value;
    console.log(cliente);
    var nota = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
    var motivo = getInputVal('motivo');

    //salvar mensagem
    saveMessage2(mes, ano, cliente, nota, motivo);

    //Muda categoria
    mudaCategoria(cliente, nota);

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
        clientes: cliente,
        nota: nota,
        motivo: motivo
    });
}

var nomes = [];
var responsaveis = [];
var cadastro = [];
var fireid = [];
var categorias = [];
var n;

firebase.database().ref('/Clientes/').on('value', function (snapshot) {
    snapshot.forEach(element => {
        nomes.push(element.val().nome);
        responsaveis.push(element.val().responsavel);
        cadastro.push(element.val().data);
        categorias.push(element.val().categoria);
        fireid.push(element.key);
    });

    n = snapshot.numChildren();

    var i = 0;
    var tableFirebase = document.getElementById("tableFirebase");
    for (i = 0; i < n; i++) {
        var tr = "<tr>" +
            "<td>" + nomes[i] + "</td>" +
            "<td>" + responsaveis[i] + "</td>" +
            "<td>" + cadastro[i] + "</td>" +
            "<td>" + categorias[i] + "</td>" +
            "</tr>";
        tableFirebase.innerHTML += tr;
    }

    var divClient = document.getElementById("divClient");
    for (i = 0; i < n; i++) {
        var check = "<label><input type='checkbox' name='checkclient' value='" + fireid[i] + "' onclick='groupChk(this)'/>" + responsaveis[i] + " - <b>" + nomes[i] + "</b> </label><br>";

        divClient.innerHTML += check;
    }

})

var avaliadores = [];
var mesavaliacoes = [];
var anoavaliacoes = [];
var notas = [];
var motivos = [];
var n2;
var table2Firebase = document.getElementById("table2Firebase");

firebase.database().ref('/Avaliacoes/').on('value', function (snapshot) {
    snapshot.forEach(element => {
        avaliadores.push(element.val().clientes);
        mesavaliacoes.push(element.val().mes);
        anoavaliacoes.push(element.val().ano);
        notas.push(element.val().nota);
        motivos.push(element.val().motivo);
    });

    n2 = snapshot.numChildren();

    $("#btnTudo").click(function () {
        table2Firebase.innerHTML = "";
        for (var j = 0; j < n2; j++) {
            var trr2 = "<tr>" +
                "<td>" + nomeAvaliador(avaliadores[j]) + "</td>" +
                "<td>" + mesavaliacoes[j] + "/" + anoavaliacoes[j] + "</td>" +
                "<td>" + notas[j] + "</td>" +
                "<td>" + motivos[j] + "</td>" +
                "</tr>";
            table2Firebase.innerHTML += trr2;
        }
    });

    $("#btnData").click(function () {
        table2Firebase.innerHTML = "";
        var bmes = getInputVal('avaMes');
        var bano = getInputVal('avaAno');
        console.log(bmes + "=" + bano);

        for (j = 0; j < n2; j++) {
            if (bmes == mesavaliacoes[j] && bano == anoavaliacoes[j]) {
                var tr2 = "<tr>" +
                    "<td>" + nomeAvaliador(avaliadores[j]) + "</td>" +
                    "<td>" + mesavaliacoes[j] + "/" + anoavaliacoes[j] + "</td>" +
                    "<td>" + notas[j] + "</td>" +
                    "<td>" + motivos[j] + "</td>" +
                    "</tr>";
                table2Firebase.innerHTML += tr2;
            }
        }
    });
})

function nomeAvaliador(id) {
    for (i = 0; i < n; i++) {
        if (id == fireid[i]) {
            return responsaveis[i];
        }
    }
    return "não encontrado";
}

function mudaCategoria(id, nota) {
    var nomee = [];
    var responsavell = [];
    var cadastroo = [];
    var fireidd = [];
    var categoriaa = [];
    var n;

    firebase.database().ref('/Clientes/').on('value', function (snapshot) {
        snapshot.forEach(element => {
            nomee.push(element.val().nome);
            responsavell.push(element.val().responsavel);
            cadastroo.push(element.val().data);
            categoriaa.push(element.val().categoria);
            fireidd.push(element.key);
        });

        n = snapshot.numChildren();
    });

    for (var i=0; i < n; i++) {
        if (id == fireidd[i]) {
            if (nota <= 6) {
                atualiza(nomee[i], responsavell[i], cadastroo[i], "Detrator",fireidd[i]);
            }
            else if (nota > 6 && nota <= 8) {
                atualiza(nomee[i], responsavell[i], cadastroo[i], "Neutro",fireidd[i]);
            } else {
                atualiza(nomee[i], responsavell[i], cadastroo[i], "Promotor",fireidd[i]);
            }
        }
    }



}

function atualiza(nm,res,cad,cat,id) {
    var Clientedados = {
        nome: nm,
        responsavel: res,
        data: cad,
        categoria: cat
    };

    var updates = {};
    updates['/Clientes/' + id] = Clientedados;

    return firebase.database().ref().update(updates);
}

function groupChk(obj) {
    var chks = document.getElementsByName('checkclient');
    var cont = 0;

    for (var i = 0; i < chks.length; i++) {
        if (chks[i].checked)
            cont++;

        var por = n * 0.2;

        if (cont > 1) {
            if (por < cont) {
                alert("Só pode marcar 20% dos clientes");
                obj.checked = false;
                break;
            }
        }
    }
}