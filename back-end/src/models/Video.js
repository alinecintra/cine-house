const mongoose = require('mongoose');

module.exports = function () {
    const schema = mongoose.Schema({
        url: {
            type: String,
            required: true
        },
        descricao: {
            type: String,
            required: true
        },
        duracao: {
            type: Number,
            required: true
        },
        categoria: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Categoria',
            required: true
        },
        resumo: {
            type: String,
            required: true
        },
        palavrasChave: {
            type: String
        }
    });
    
    return mongoose.model('Video', schema, 'videos');
}
