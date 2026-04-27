const express = require('express');
const router = express.Router();
const BibliotecaUsuarios = require('../database/BibliotecaUsuarios');

router.post('/', async (req, res) => {
    try {
        const novoUsuario = await BibliotecaUsuarios.criar(req.body);
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const usuarios = await BibliotecaUsuarios.buscarTodos();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const usuarioRemovido = await BibliotecaUsuarios.remover(req.params.id);
        if (!usuarioRemovido) {
            return res.status(404).json({ erro: "Utilizador não encontrado" });
        }
        res.status(200).json({ mensagem: "Utilizador removido com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao remover utilizador" });
    }
});

module.exports = router;