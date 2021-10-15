var app = {

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        document.getElementById("btnBuscar").addEventListener("click",app.buscar);
        document.getElementById("btnEditar").addEventListener("click",app.editar);
    },

    buscar: function(){
        var url_string = window.location.href;
        var url= new URL(url_string);
        var getTelefone = url.searchParams.get("telefone");

        var db = firebase.firestore();
        var ag = db.collection("cadastro").where("Telefone", "==", getTelefone);

        ag.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                document.getElementById("nometxt").value = doc.data().Nome;
                document.getElementById("teltxt").value = doc.data().Telefone;
                document.getElementById("origemtxt").value = doc.data().Origem;
                document.getElementById("contxt").value = doc.data().Data;
                document.getElementById("obstxt").value = doc.data().Obs;
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    },

    editar: function(){
        var url_string = window.location.href;
        var url= new URL(url_string);
        var getTelefone = url.searchParams.get("telefone");

        let cnome = document.getElementById("nometxt").value;
        let ctelefone = document.getElementById("teltxt").value;
        let corigem = document.getElementById("origemtxt").value;
        let cdata_contato = document.getElementById("contxt").value;
        let cobservacao = document.getElementById("obstxt").value;

        var db = firebase.firestore();
        var ag = db.collection("cadastro").where("Telefone", "==", getTelefone);

        ag.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var dados = db.collection("cadastro").doc(doc.id);

                return dados.update({
                    Nome: cnome,
                    Telefone: ctelefone,
                    Origem: corigem,
                    Data: cdata_contato,
                    Obs: cobservacao
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    window.location.href = cordova.file.applicationDirectory + "www/consultar.html";
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    }

};

app.initialize();