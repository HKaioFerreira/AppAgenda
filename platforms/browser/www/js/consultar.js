var app = {

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        document.getElementById("btnListar").addEventListener("click",app.listar);
    },

    listar: function(){
        var db = firebase.firestore();
        var ag = db.collection("cadastro");

        ag.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                $("#TableData").append("<tr>");
                $("#TableData").append("<td scope='col'>" + doc.data().Nome + "</td>");
                $("#TableData").append("<td scope='col'>" + doc.data().Telefone + "</td>");
                $("#TableData").append("<td scope='col'>" + doc.data().Origem + "</td>");
                $("#TableData").append("<td scope='col'>" + doc.data().Data + "</td>");
                $("#TableData").append("<td scope='col'>" + doc.data().Obs + "</td>");
                $("#TableData").append("<td scope='col'><a href='" + cordova.file.applicationDirectory + "www/editar.html?Telefone=" + doc.data().Telefone + "'>Editar</a>&nbsp;|&nbsp;<a href='" + cordova.file.applicationDirectory + "www/excluir.html?Telefone=" + doc.data().telefone + "'>Excluir</a></td>");
                $("#TableData").append("</tr>");
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }

};

app.initialize();