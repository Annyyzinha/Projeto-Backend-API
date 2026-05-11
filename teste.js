const mongoose = require('mongoose');
const BibliotecaUsuarios = require('./src/database/bibliotecaUsuarios');
const BibliotecaPosts = require('./src/database/bibliotecaPosts');
const BibliotecaComentarios = require('./src/database/bibliotecaComentarios');

async function executarTestes() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/cozinhando_com_amor');
        console.log("Conectado ao MongoDB!");

        console.log("\n--- TESTANDO INSERÇÃO ---");
        const novoUsuario = await BibliotecaUsuarios.criar({
            nome: "Beatriz",
            username: "@beatriz",
            email: "beatriz@utfpr.edu.br"
        });
        console.log(`Usuário criado: ${novoUsuario.nome}`);

        const novaReceita = await BibliotecaPosts.publicar({
            texto: "Receita de torta de limão fácil!",
            autorId: novoUsuario._id
        });
        console.log(`Receita publicada: ${novaReceita.texto}`);

        const novoComentario = await BibliotecaComentarios.criar({
            texto: "Fiz ontem e ficou deliciosa!",
            postagemId: novaReceita._id,
            autorId: novoUsuario._id
        });
        console.log(`Comentário publicado: ${novoComentario.texto}`);

        console.log("\n--- TESTANDO BUSCA ---");
        const todasReceitas = await BibliotecaPosts.buscarTodos();
        console.log(`Foram encontradas ${todasReceitas.length} receitas no banco.`);
        
        const todosComentarios = await BibliotecaComentarios.buscarTodos();
        console.log(`Foram encontrados ${todosComentarios.length} comentários no banco.`);

        console.log("\n--- TESTANDO DELEÇÃO ---");
        await BibliotecaComentarios.remover(novoComentario._id);
        console.log("Comentário apagado com sucesso.");
        
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