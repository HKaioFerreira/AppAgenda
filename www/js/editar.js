var app= {

    //construtor
    
        initialize: function(){
            document.addEventListener('deviceready', this.onDeviceReady.bind(this),false);
        },
    
        onDeviceReady: function(){
            document.getElementById("btnBuscar").addEventListener("click",app.buscar);
            document.getElementById("btnEditar").addEventListener("click",app.editar);
            
            this.receivedEvent('deviceready');
        },
    
        receivedEvent: function(id){
            db = window.sqlitePlugin.openDatabase({
                name: 'aplicativo.db', location:'default', androidDatabaseProvider:'system'
            });
            db.transaction(function(tx){
                tx.executeSql('CREATE TABLE IF NOT EXISTS clientes(nome,telefone,origem,data_contato,observacao)');
            }, function(error){
                console.log('Transaction ERROR:'+ error.message);
            },function(){
                alert('Banco e Tabela clientes criados com sucesso!');
            });
    
        },
    
        buscar: function(){
            var url_string = window.location.href;
            var url = new URL(url_string);
            var getTelefone= url.searchParams.get("telefone");
            alert(getTelefone);
            db.executeSql('SELECT nome AS uNome,telefone AS uTelefone,origem AS uOrigem,data_contato AS uData_contato,observacao AS uObservacao FROM clientes WHERE telefone=?',[getTelefone], function(rs) {
                alert(JSON.stringify(rs));
                alert(rs.rows.length);
                let i=0;
                for(i=0;i<rs.rows.lenght;i++){
                    alert("item"+i);
                    let recordItem = rs.rows.item(i);
                    alert(JSON.stringify(recordItem));
                    document.getElementById("nometxt").value = rs.rows.item(i).uNome;
                    document.getElementById("teltxt").value= rs.rows.item(i).uTelefone;
                    document.getElementById("origemtxt").value= rs.rows.item(i).uOrigem;
                    document.getElementById("contxt").value= rs.rows.item(i).uData_contato;
                    document.getElementById("obstxt").value= rs.rows.item(i).uObservacao;
                }

            }, function(error){
                alert('Erro no SELECT: '+ error.message);
            });
        },

        editar: function(){
            var url_string = window.location.href;
            var url = new URL(url_string);
            var getTelefone= url.searchParams.get("telefone");
            alert(getTelefone);

            let nome = document.getElementById("nometxt").value;
            let telefone = document.getElementById("teltxt").value;
            let origem = document.getElementById("origemtxt").value;
            let data_contato = document.getElementById("contxt").value;
            let observacao = document.getElementById("obstxt").value;

            db.transaction(function(tx){
                tx.executeSql('UPDATE clientes SET nome=?, telefone=?,origem=?,data_contato=?,observacao=? WHERE telefone=?',[nome,telefone,origem,data_contato,observacao,getTelefone]);
            },function(error){
                alert('Erro durante a transacao com banco: '+ error.menssage);
            },function(){
                alert('Atualização realizada com sucesso!!')
            });
        },
    };
    app.initialize();