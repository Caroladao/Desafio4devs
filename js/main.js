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
document.getElementById('contactform').addEventListener('submit',submitForm);

//Submit form
function submitForm(e){
    e.preventDefault();

    //Pegar valores
    var nome = getInputVal('nome');
    var responsavel = getInputVal('responsavel');
    var data = getInputVal('data');

    //salvar mensagem
    saveMessage(nome, responsavel,data);

    //Show alert
    document.querySelector('.alert').style.display = 'block';

    //Hide alert depois de 3 segundos
    setTimeout(function(){
        document.querySelector('.alert').style.display = 'none';
    },3000);

    //limpar form
    document.getElementById('contactform').reset();

}

//Função para pegar o valor dos formularios
function getInputVal(id){
    return document.getElementById(id).value;
}

//Salvar mensagem
function saveMessage(nome,responsavel,data){
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
document.getElementById('formAvalia').addEventListener('submit',submitForm2);

//Submit form
function submitForm2(e){
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
    setTimeout(function(){
        document.querySelector('.alertt').style.display = 'none';
    },3000);

    //limpar form
    document.getElementById('formAvalia').reset();

}

//Salvar mensagem
function saveMessage2(mes, ano, cliente, nota, motivo){
    var newMessagesRef2 = messagesRef2.push();
    newMessagesRef2.set({
        mes: mes,
        ano: ano,
        cliente: cliente,
        nota: nota,
        motivo: motivo
    });
}

var tableFirebase = $('div.tableFirebase');
$('a#menu-lista-cli').click(function(){
    $.ajax({
        type: 'GET',
        url: "https://desafio4devs.firebaseio.com",
        dataType: 'json',
        sucess: function(data){
            $each(data, function(index,item){
                $each(item, function(key, value){
                    tableFirebase.append(key +':'+value+'<br>');
                });
                tableFirebase.append('<br><br>');
            });
        }
    });
})