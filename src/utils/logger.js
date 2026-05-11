const fs = require('fs');
const path = require('path');

const logError = (erro) => {
    const logsDir = path.join(__dirname, '../../logs');
    const logPath = path.join(logsDir, 'erros.log');
    
    try {
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
        }

        const mensagem = `[${new Date().toISOString()}] ERRO: ${erro.message}\nStack: ${erro.stack}\n\n`;
        fs.appendFileSync(logPath, mensagem);
    } catch (err) {
        console.error("Falha fatal ao gravar log:", err);
    }
};

module.exports = { logError };