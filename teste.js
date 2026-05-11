const mongoose = require('mongoose');
const BibliotecaUsuarios = require('./src/database/bibliotecaUsuarios');
const BibliotecaPosts = require('./src/database/bibliotecaPosts');

async function executarTestes() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/cozinhando_com_amor');
        console.log("Conectado ao MongoDB!");

        console.log("\n--- TESTANDO INSERÇÃO ---");
        const novoUsuario = await BibliotecaUsuarios.criar({
            nome: "Ana",
            username: "@ana",
            email: "ana@utfpr.edu.br"
        });
        console.log(`Usuário criado: ${novoUsuario.nome}`);

        const novaReceita = await BibliotecaPosts.publicar({
            texto: "Receita de bolo de cenoura fácil!",
            autorId: novoUsuario._id
        });
        console.log(`Receita publicada: ${novaReceita.texto}`);

        console.log("\n--- TESTANDO BUSCA ---");
        const todasReceitas = await BibliotecaPosts.buscarTodos();
        console.log(`Foram encontradas ${todasReceitas.length} receitas no banco.`);

        console.log("\n--- TESTANDO DELEÇÃO ---");
        await BibliotecaPosts.remover(novaReceita._id);
        console.log("Receita apagada com sucesso do banco.");

        console.log("\n--- TESTANDO TRATAMENTO DE ERROS E LOGS ---");
        try {
            console.log("Forçando a criação de um usuário sem dados obrigatórios...");
            await BibliotecaUsuarios.criar({}); 
        } catch (erro) {
            console.log("Erro capturado com sucesso pela biblioteca!");
            console.log("Verifique a pasta 'logs' para ver o ficheiro 'erros.log'.");
        }

    } catch (erro) {
        console.error("Erro geral na execução:", erro);
    } finally {
        await mongoose.disconnect();
        console.log("\nConexão com o banco encerrada.");
    }
}

executarTestes();