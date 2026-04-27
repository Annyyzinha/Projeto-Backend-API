const express = require('express');
const router = express.Router();
const BibliotecaComentarios = require('../database/BibliotecaComentarios');

router.post('/', async (req, res) => {
    try {
        const novoComentario = await BibliotecaComentarios.criar(req.body);
        res.status(201).json(novoComentario);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const comentarios = await BibliotecaComentarios.buscarTodos();
        res.status(200).json(comentarios);
    } catch (error) {
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const comentarioRemovido = await BibliotecaComentarios.remover(req.params.id);
        if (!comentarioRemovido) {
            return res.status(404).json({ erro: "Comentário não encontrado" });
        }
        res.status(200).json({ mensagem: "Comentário removido com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao remover comentário" });
    }
});

module.exports = router;