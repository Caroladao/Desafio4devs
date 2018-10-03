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
    
    var messagesRef = firebase.database().ref('Clientes');

    document.getElementById('tableFirebase').addEventListener('click',mostrarTable);

    function mostrarTable(){
        
    }




    // <tr id ="${cliente.nome}" >
    //     <td>${cliente.nome}</td>
    //     <td>${cliente.data}</td>
    //     <td>${cliente.responsavel}</td>
    //     <td class="trash-icon" name="${cliente.nome}">X</td>
    // </tr>

