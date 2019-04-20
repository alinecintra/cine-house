const mongoose = require('mongoose');
const md5 = require('md5');
const Usuario = require('../models/Usuario')();

module.exports = function () {
    return {
        create: function (request, response) {
            const usuario = request.body;
            usuario.senha = md5(usuario.senha);

            Usuario.create(usuario)
                .then(function () {
                    response.sendStatus(201).end();
                })
                .catch(function (erro) {
                    console.log('Erro ao criar usuario: ', erro);
                    response.sendStatus(500).end();
                });
        },

        get: function (request, response) {
            Usuario.find()
                .then(function (usuario) {
                    response.json(usuario).end();
                })
                .catch(function (erro) {
                    console.log('Erro ao consultar usuario: ', erro);
                    response.sendStatus(500).end();
                });
        },

        getById: function (request, response) {
            const id = request.params.id;

            Usuario.findById(id)
                .then(function (usuario) {
                    if (usuario) {
                        response.json(usuario).end();
                    } else {
                        response.sendStatus(404).end();
                    }
                })
                .catch(function (erro) {
                    console.log('Erro ao consultar usuario por id: ' + id + ' : ', erro);
                    response.send(500).end();
                });
        },

        update: function (request, response) {
            const id = request.params.id;
            const usuario = request.body;
            usuario.senha = md5(usuario.senha);

            Usuario.findByIdAndUpdate(id, usuario)
                .exec()
                .then(function (usuario) {
                    if (usuario) {
                        response.sendStatus(204).end();
                    } else {
                        response.sendStatus(404).end();
                    }
                })
                .catch(function (erro) {
                    console.log('Erro ao criar usuario: ', erro);
                    response.send(500).end();
                });
        },

        delete: function (request, response) {
            const id = request.params.id;

            Usuario.findByIdAndRemove(id, request.body)
            .exec()
            .then(function (usuario) {
                if (usuario) {
                    response.sendStatus(204).end();
                } else {
                    response.sendStatus(404).end();
                }
            })
            .catch(function (erro) {
                console.log('Erro ao exluir usuario: ', erro);
                response.sendStatus(500).end();
            });

        },

        login: function (request, response) {
            Usuario.findOne({
                nome: request.body.nome,
                senha: md5(request.body.senha)
            })
            .exec()
            .then(function (usuario) {
                if (usuario) {
                    response.json(usuario).end();
                } else {
                    response.sendStatus(404).end();
                }
            })
            .catch(function (erro) {
                console.log('Erro ao fazer login: ', erro);
                response.sendStatus(500).end();
            });
        }        
    }
}