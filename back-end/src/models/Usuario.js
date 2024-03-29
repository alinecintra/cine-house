const mongoose = require('mongoose');

module.exports = function() {
    
    const schema = mongoose.Schema({
        nome: {
            type: String,
            required: true

        },

        email: {
            type: String,
            required: true
        },

        senha: {
            type: String,
            required: true
        }
    });

    
    return mongoose.model('Usuario', schema, 'usuarios');
    
}