const express = require('express');
const mongoose = require('mongoose');
const postagensRoutes = require('./src/routes/postagensRoutes');
const usuariosRoutes = require('./src/routes/usuariosRoutes');
const comentariosRoutes = require('./src/routes/comentariosRoutes');

const app = express();

app.use(express.json());

app.use('/api/postagens', postagensRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/comentarios', comentariosRoutes); 

mongoose.connect('mongodb://127.0.0.1:27017/cozinhando_com_amor')
    .then(() => {
        console.log("Banco de dados conectado!");
        
        app.listen(3000, () => {
            console.log("Servidor rodando na porta 3000. Acesse: http://localhost:3000");
        });
    })
    .catch(err => console.error("Erro na conexão com o banco:", err));