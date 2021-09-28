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
            name: 'aplicativo.db', location:'default', androidDatabaseProvider:'system'
        });
        db.transaction(function(tx){
            tx.executeSql('CREATE TABLE IF NOT EXISTS clientes(nome,telefone,origem,data_contato,observacao)');
        }, function(error){
            console.log('Transaction ERROR: ' + error.message);
        },function(){
            alert('Banco e Tabela clientes criados com sucesso!');
        });

    },

    inserir: function(){
        let nome = document.getElementById("nometxt").value;
        let telefone = document.getElementById("teltxt").value;
        let origem = document.getElementById("origemtxt").value;
        let data_contato = document.getElementById("contxt").value;
        let observacao = document.getElementById("obstxt").value;
    
        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO clientes VALUES (?,?,?,?,?)', [nome, telefone, origem, data_contato, observacao]);
        }, function(error) {
            alert('Erro durante a transacao com o banco: ' + error.message);
        }, function() {
            alert('Insercao realizada com sucesso!!!');
        });
    },
};
app.initialize();