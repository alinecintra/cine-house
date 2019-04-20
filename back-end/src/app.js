const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const videoRoutes = require('./routes/video');
const categoriaRoutes = require('./routes/categoria');
const usuarioRoutes = require('./routes/usuario');
const historicoRoutes = require('./routes/historico');
const avaliacaoRoutes = require('./routes/avaliacao');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/videos', videoRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/historicos', historicoRoutes);
app.use('/avaliacoes', avaliacaoRoutes);

const db = require('./config/database');
db('mongodb://localhost:27017/cine-house');

const port = 9000;

app.listen(port, '', function () {
    console.log('Servidor rodando na porta ' + port);
});

module.exports = app;