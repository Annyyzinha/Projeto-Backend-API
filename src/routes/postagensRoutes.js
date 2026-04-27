const express = require('express');
const router = express.Router();
const BibliotecaPosts = require('../database/BibliotecaPosts');

router.post('/', async (req, res) => {
    try {
        const novaPostagem = await BibliotecaPosts.publicar(req.body);
        res.status(201).json(novaPostagem);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const postagens = await BibliotecaPosts.buscarTodos();
        res.status(200).json(postagens);
    } catch (error) {
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const postagemRemovida = await BibliotecaPosts.remover(req.params.id);
        if (!postagemRemovida) {
            return res.status(404).json({ erro: "Postagem não encontrada" });
        }
        res.status(200).json({ mensagem: "Postagem removida com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao remover postagem" });
    }
});

module.exports = router;