const { Usuario } = require('../models/Modelos');
const { logError } = require('../utils/logger');

class BibliotecaUsuarios {
    async criar(dados) {
        try {
            const novoUsuario = new Usuario(dados);
            return await novoUsuario.save();
        } catch (error) {
            logError(error);
            throw error;
        }
    }

    async buscarTodos() {
        try {
            return await Usuario.find({});
        } catch (error) {
            logError(error);
            throw error;
        }
    }

    async remover(id) {
        try {
            return await Usuario.findByIdAndDelete(id);
        } catch (error) {
            logError(error);
            throw error;
        }
    }

    async atualizar(id, novosDados) {
        try {
            return await Usuario.findByIdAndUpdate(id, novosDados, { new: true, runValidators: true });
        } catch (error) {
            logError(error);
            throw error;
        }
    }
}

module.exports = new BibliotecaUsuarios();