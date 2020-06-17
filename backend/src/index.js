const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const http = require('http');
const path = require('path');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);
setupWebsocket(server);

mongoose.connect('mongodb+srv://floriano:vitamavi2005@cluster0-zhzsq.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// MÉTODOS HTTP: GET recebe, POST criar, PUT editar, DELETE deletar precisam de uma requisição do front end
// WEB SOCKET: não precisa de requisição front end

// Tipos de parametros:
// Query Params: request.query (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

// MongoDB (Não-Relacional)
app.use(cors())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(express.json());
app.use(routes);

server.listen(3333);