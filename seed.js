const mongoose = require('mongoose');
const { Usuario, Postagem, Comentario } = require('./src/models/Modelos');

async function popularBanco() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/cozinhando_com_amor');
        console.log("Conectado! Limpando banco de dados...");

        await Usuario.deleteMany({});
        await Postagem.deleteMany({});
        await Comentario.deleteMany({});

        console.log("Criando chefs e entusiastas da culinária...");
        const users = await Usuario.insertMany([
            { nome: "Chef João", username: "@chef_joao", email: "joao.cozinha@exemplo.com" },
            { nome: "Bela Cozinha", username: "@bela_cozinha", email: "bela@receitas.com" },
            { nome: "Vegano Prático", username: "@vegano_pratico", email: "contato@veganopratico.com" },
            { nome: "Maria Confeiteira", username: "@maria_doces", email: "maria.doces@confeitaria.com" }
        ]);

        console.log("Criando publicações de receitas...");
        const posts = await Postagem.insertMany([
            { texto: "Dica de ouro para o bolo não solar: certifique-se de que todos os ingredientes estão em temperatura ambiente!", autorId: users[3]._id },
            { texto: "Hoje testei um risoto de cogumelos que ficou divino. O verdadeiro segredo é fazer o próprio caldo de legumes em casa.", autorId: users[0]._id },
            { texto: "Buscando ideias para um jantar rápido e prático para essa sexta-feira. O que vocês costumam preparar?", autorId: users[1]._id },
            { texto: "Hambúrguer de grão-de-bico com maionese verde de abacate. Rápido, nutritivo e super em conta!", autorId: users[2]._id },
            { texto: "Qual a opinião de vocês sobre trocar manteiga por margarina na massa podre? Eu sou time manteiga sempre!", autorId: users[3]._id }
        ]);

        console.log("Criando interações e comentários...");
        await Comentario.insertMany([
            { texto: "Concordo totalmente! A manteiga traz uma textura e um sabor que a margarina não consegue replicar.", postagemId: posts[4]._id, autorId: users[0]._id },
            { texto: "Você pode compartilhar as medidas exatas do hambúrguer? Fiquei com água na boca!", postagemId: posts[3]._id, autorId: users[1]._id },
            { texto: "Aqui em casa sexta-feira é lei: pizza de frigideira com massa de iogurte. Fica pronto em 15 minutos.", postagemId: posts[2]._id, autorId: users[0]._id }
        ]);

        console.log("Banco de dados populado com sucesso!");
        process.exit(0);
    } catch (erro) {
        console.error("Erro ao popular banco:", erro);
        process.exit(1);
    }
}

popularBanco();