var app = {
        
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        document.getElementById("btnInserir").addEventListener("click",app.inserir);  
    },

    inserir: function(){
        var db = firebase.firestore();

        let cnome = document.getElementById("nometxt").value;
        let ctelefone = document.getElementById("teltxt").value;
        let corigem = document.getElementById("origemtxt").value;
        let cdata_contato = document.getElementById("contxt").value;
        let cobservacao = document.getElementById("obstxt").value;

        db.collection("cadastro").add({
            Nome: cnome,
            Telefone: ctelefone,
            Origem: corigem,
            Data: cdata_contato,
            Obs: cobservacao
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

    }  
};

app.initialize();