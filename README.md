# Cozinhando com Amor 🍳

Esta é uma API RESTful de microblogging desenvolvida como o **Projeto 1** da disciplina de Back-end. 

## 🚀 Tecnologias Utilizadas

* **Node.js**: Ambiente de execução.
* **Express**: Framework para gestão de rotas e servidor.
* **MongoDB & Mongoose**: Base de dados NoSQL e modelagem de dados.
* **FS (File System)**: Módulo nativo para persistência de logs de erro.

## 📂 Estrutura de Pastas

* `/src/models`: Definição dos esquemas do banco de dados.
* `/src/database`: Classes de biblioteca com a lógica de persistência.
* `/src/routes`: Definição dos endpoints da API.
* `/src/utils`: Utilitários como o sistema de logs.

## 🛠️ Como Executar o Projeto

1.  **Instalar Dependências**:
    ```bash
    npm install
    ```

2.  **Popular a Base de Dados**:
    Para carregar as receitas e utilizadores fictícios, execute o script de seed:
    ```bash
    node seed.js
    ```

3.  **Iniciar o Servidor**:
    ```bash
    node app.js
    ```
    A API estará ativa em `http://localhost:3000`.

---
**Desenvolvido por:** Anny Vitoria Costa - UTFPR