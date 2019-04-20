const mongoose = require('mongoose');

module.exports = function() {
    
    const schema = mongoose.Schema({
        descricao: {
            type: String,
            required: true
        }
    });
    
    return mongoose.model('Categoria', schema, 'categorias');
    
}