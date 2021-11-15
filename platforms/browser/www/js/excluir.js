var app= {

    //construtor
    
        initialize: function(){
            document.addEventListener('deviceready', this.onDeviceReady.bind(this),false);
        },
    
        onDeviceReady: function(){
            document.getElementById("btnBuscar").addEventListener("click",app.buscar);
            document.getElementById("btnExcluir").addEventListener("click",app.excluir);
            
            
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

        excluir: function(){
            var url_string = window.location.href;
            var url = new URL(url_string);
            var getTelefone = url.searchParams.get("telefone");
            var db = firebase.firestore();
            var ag = db.collection("cadastro").where("Telefone","==", getTelefone);

            navigator.notification.confirm(
                'Deseja excluir esse registro?',
                onConfirm,
                'Excluir',
                ['Sim','Não']
            );

                    function onConfirm(buttonIndex) {
                      
                        if(buttonIndex == 1){
                            ag.get().then((querySnapshot) => {querySnapshot.forEach((doc) => {
                                db.collection("cadastro").doc(doc.id).delete().then(() => {
                                     console.log("documento deletado com sucesso" ); 
                                     window.location.href = cordova.file.applicationDirectory + "www/consultar.html";}).catch((error) => {
                                         console.error("Erro ao remover Documento: ",error);});
                            });
                        })
                        .catch((error) => {
                            console.log("Erro ao buscar documentos: ",error);
                        });
                    }
                }
            
        }
    };
app.initialize();