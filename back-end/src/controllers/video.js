const mongoose = require('mongoose');
const Video = require('../models/Video')();

module.exports = function () {
    return {
        create: function (request, response) {
            const video = request.body;
            console.log(video)
            Video.create(video)
                .then(function () {
                    response.sendStatus(201).end();
                })
                .catch(function (erro) {
                    console.log('Erro ao criar video: ', erro);
                    response.sendStatus(500).end();
                });
        },

        get: function (request, response) {
            const where = {};

            if (request.query.filtro) {
                where.descricao = { $regex: '.*' + request.query.filtro + '.*' }
            }

            Video.find(where).populate('categoria')
                .then(function (videos) {
                    response.json(videos).end();
                })
                .catch(function (erro) {
                    console.log('Erro ao consultar videos: ', erro);
                    response.sendStatus(500).end();
                });
        },

        getById: function (request, response) {
            const id = request.params.id;

            Video.findById(id).populate('categoria')
                .then(function (video) {
                    console.log(video)
                    if (video) {
                        response.json(video).end();
                    } else {
                        response.sendStatus(404).end();
                    }
                })
                .catch(function (erro) {
                    console.log('Erro ao consultar video por id: ' + id + ' : ', erro);
                    response.sendStatus(500).end();
                });
        },

        update: function (request, response) {
            const id = request.params.id;

            Video.findByIdAndUpdate(id, request.body)
                .exec()
                .then(function (video) {
                    if (video) {
                        response.sendStatus(204).end();
                    } else {
                        response.sendStatus(404).end();
                    }
                })
                .catch(function (erro) {
                    console.log('Erro ao atualizar video: ', erro);
                    response.sendStatus(500).end();
                });
        },

        delete: function (request, response) {
            const id = request.params.id;

            Video.findByIdAndRemove(id, request.body)
            .exec()
            .then(function (video) {
                if (video) {
                    response.sendStatus(204).end();
                } else {
                    response.sendStatus(404).end();
                }
            })
            .catch(function (erro) {
                console.log('Erro ao exluir video: ', erro);
                response.sendStatus(500).end();
            });

        }
    }
}