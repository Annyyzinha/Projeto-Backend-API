const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true }
});

const postagemSchema = new mongoose.Schema({
    texto: { type: String, required: true, maxlength: 280 },
    autorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    dataCriacao: { type: Date, default: Date.now }
});

const comentarioSchema = new mongoose.Schema({
    texto: { type: String, required: true },
    postagemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Postagem', required: true },
    autorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    dataCriacao: { type: Date, default: Date.now }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
const Postagem = mongoose.model('Postagem', postagemSchema);
const Comentario = mongoose.model('Comentario', comentarioSchema);

module.exports = { Usuario, Postagem, Comentario };