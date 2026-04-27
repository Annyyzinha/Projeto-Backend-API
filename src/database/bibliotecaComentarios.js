const { Comentario } = require('../models/Modelos');
const { logError } = require('../utils/logger');

class BibliotecaComentarios {
    async criar(dados) {
        try {
            const novoComentario = new Comentario(dados);
            return await novoComentario.save(); 
        } catch (error) {
            logError(error); 
            throw error;
        }
    }

    async buscarTodos() {
        try {
            return await Comentario.find({}); 
        } catch (error) {
            logError(error);
            throw error;
        }
    }

    async remover(id) {
        try {
            return await Comentario.findByIdAndDelete(id); 
        } catch (error) {
            logError(error);
            throw error;
        }
    }

    async atualizar(id, novosDados) {
        try {
            return await Comentario.findByIdAndUpdate(id, novosDados, { new: true, runValidators: true });
        } catch (error) {
            logError(error);
            throw error;
        }
    }
}

module.exports = new BibliotecaComentarios();