const mongoose = require('mongoose');

module.exports = function() {
    
    const schema = mongoose.Schema({
        usuario: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Usuario',
            required: true
        },

        video: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Video',
            required: true
        },

        nota: {
            type: Number,
            required: true
        },

        data: {
            type: Date,
            required: true,
            default: Date.now() // Valor padrão para o atributo
        }
    });
    
    return mongoose.model('Avaliacao', schema, 'avaliacoes');
    
}