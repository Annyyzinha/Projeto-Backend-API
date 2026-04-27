const { Postagem } = require('../models/Modelos');
const { logError } = require('../utils/logger');

class BibliotecaPosts {
    async publicar(dados) {
        try {
            const novaPostagem = new Postagem(dados);
            return await novaPostagem.save(); 
        } catch (error) {
            logError(error); 
            throw error;
        }
    }

    async buscarTodos() {
        try {
            return await Postagem.find({}); 
        } catch (error) {
            logError(error);
            throw error;
        }
    }

    async remover(id) {
        try {
            return await Postagem.findByIdAndDelete(id); 
        } catch (error) {
            logError(error);
            throw error;
        }
    }
}

module.exports = new BibliotecaPosts();