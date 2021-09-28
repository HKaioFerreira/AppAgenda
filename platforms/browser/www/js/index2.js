var app= {

//construtor

    initialize: function(){
        document.addEventListener('deviceready', this.onDeviceReady.bind(this),false);
    },

    onDeviceReady: function(){
        document.getElementById("btnInserir").addEventListener("click",app.inserir);
        
        this.receivedEvent('deviceready');
    },

    receivedEvent: function(id){
        db = window.sqlitePlugin.openDatabase({
            name: 'aplicativo.bd', location:'default', androidDatabaseProvider:'system'
        });
        db.transaction(function(tx){
            tx.executeSql('CRATE TABLE IF NOT EXISTS clientes(nome,telefone,origem,data_contato,observacao)');
        }, function(error){
            console.log('Trabsaction ERROR:'+ error.message);
        },function(){
            alert('Banco e Tabela clientes criados com sucesso!');
        });

    },

    inserir: function(){
        let nome = document.getElementById("nometxt").nodeValue;
        let telefone = document.getElementById("teltxt").nodeValue;
        let origem = document.getElementById("origemtxt").nodeValue;
        let data_contato = document.getElementById("contxt").nodeValue;
        let observacao = document.getElementById("obstxt").nodeValue;
    
    db.transaction(function(tx){
        tx.executeSql('INSERT INTO clientes VALUES (?,?,?,?,?)',[nome,telefone,origem,data_contato,observacao]);
    }, function(error){
        alert('Erro durate a transacao com o banco:'+ error.message);
    },function(){
        alert('Insercao realizada com sucesso!');
    });
    },
};
app.initialize();