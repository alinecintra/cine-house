const mongoose = require('mongoose');
const Categoria = require('../models/Categoria')();

module.exports = function () {
    return {
        create: function (request, response) {
            const categoria = request.body;

            Categoria.create(categoria)
                .then(function () {
                    response.sendStatus(201).end();
                })
                .catch(function (erro) {
                    console.log('Erro ao criar categoria: ', erro);
                    response.sendStatus(500).end();
                });
        },

        get: function (request, response) {
            Categoria.find()
                .then(function (categorias) {
                    response.json(categorias).end();
                })
                .catch(function (erro) {
                    console.log('Erro ao consultar categoria: ', erro);
                    response.sendStatus(500).end();
                });
        },

        getById: function (request, response) {
            const id = request.params.id;

            Categoria.findById(id)
                .then(function (categoria) {
                    if (categoria) {
                        response.json(categoria).end();
                    } else {
                        response.sendStatus(404).end();
                    }
                })
                .catch(function (erro) {
                    console.log('Erro ao consultar categoria por id: ' + id + ' : ', erro);
                    response.sendStatus(500).end();
                });
        },

        update: function (request, response) {
            const id = request.params.id;

            Categoria.findByIdAndUpdate(id, request.body)
                .exec()
                .then(function (categoria) {
                    if (categoria) {
                        response.sendStatus(204).end();
                    } else {
                        response.sendStatus(404).end();
                    }
                })
                .catch(function (erro) {
                    console.log('Erro ao atualizar categoria: ', erro);
                    response.sendStatus(500).end();
                });
        },

        delete: function (request, response) {
            const id = request.params.id;

            Categoria.findByIdAndRemove(id, request.body)
            .exec()
            .then(function (categoria) {
                if (categoria) {
                    response.sendStatus(204).end();
                } else {
                    response.sendStatus(404).end();
                }
            })
            .catch(function (erro) {
                console.log('Erro ao exluir categoria: ', erro);
                response.sendStatus(500).end();
            });

        }
    }
}