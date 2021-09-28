var app= {

    //construtor
    
        initialize: function(){
            document.addEventListener('deviceready', this.onDeviceReady.bind(this),false);
        },
    
        onDeviceReady: function(){
            document.getElementById("btnListar").addEventListener("click",app.listar);
            
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
    
        listar:function(){
            db.executeSql('SELECT nome AS uNome,telefone AS uTelefone,origem AS uOrigem,data_contato AS uData_contato,observacao AS uObservacao FROM clientes',[],function(rs){
            alert(JSON.stringify(rs));
            alert(rs.rows.lenght);
            let i=0;
            for(i=0;i<rs.rows.lenght;i++){
                alert("item"+i);
                let recordItem = rs.rows.item(i);
                alert(JSON.stringify(recordItem));
                $("#tableData").append("<tr>");
                $("#tableData").append("<td scope='col'>" + rs.rows.item(i).uNome + "</td>");
                $("#tableData").append("<td scope='col'>" + rs.rows.item(i).uTelefone + "</td>");
                $("#tableData").append("<td scope='col'>" + rs.rows.item(i).uOrigem + "</td>");
                $("#tableData").append("<td scope='col'>" + rs.rows.item(i).uData_contato + "</td>");
                $("#tableData").append("<td scope='col'>" + rs.rows.item(i).uObservacao + "</td>");
                $("#tableData").append("<td scope='col'><a href='" + cordova.file.applicationDirectory+"www/editarclientes.html?telefone="+ rs.rows.item(i).uTelefone +"'>Editar</a></td>");
                $("#tableData").append("</tr>");
            }
                alert('Record count(expected to be 2): '+rs.rows.item(0).uLoginName);
            },function(error){
                alert('Erro no SELECT: '+error.message);
            });       
                
    },
};
    app.initialize();