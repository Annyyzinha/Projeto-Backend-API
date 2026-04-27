const fs = require('fs');
const path = require('path');

const logError = (erro) => {
    const logPath = path.join(__dirname, '../../logs/erros.log');
    const mensagem = `[${new Date().toISOString()}] ERRO: ${erro.message}\nStack: ${erro.stack}\n\n`;
    
    try {        
        fs.appendFileSync(logPath, mensagem);
    } catch (err) {
        console.error("Falha fatal ao gravar log:", err);
    }
};

module.exports = { logError };