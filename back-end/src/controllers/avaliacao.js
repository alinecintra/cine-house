const mongoose = require('mongoose');
const Avaliacao = require('../models/Avaliacao')();

module.exports = function () {
    return {
        create: function (request, response) {
            const avaliacao = request.body;

            Avaliacao.create(avaliacao)
                .then(function () {
                    response.sendStatus(201).end();
                })
                .catch(function (erro) {
                    console.log('Erro ao criar avaliação: ', erro);
                    response.sendStatus(500).end();
                });
        },

        
        update: function (request, response) {
            const id = request.params.id;

            Avaliacao.findByIdAndUpdate(id, request.body)
                .exec()
                .then(function (avaliacao) {
                    if (avaliacao) {
                        response.sendStatus(204).end();
                    } else {
                        response.sendStatus(404).end();
                    }
                })
                .catch(function (erro) {
                    console.log('Erro ao atualizar avaliação: ', erro);
                    response.sendStatus(500).end();
                });
        },

        get: function (request, response) {
            const where = {};

            if (request.query.usuario) {
                where.usuario = request.query.usuario;
            }

            if (request.query.video) {
                where.video = request.query.video;
            }

            Avaliacao.find(where).populate('usuario').populate('video')
                .then(function (avaliacoes) {
                    response.json(avaliacoes).end();
                })
                .catch(function (erro) {
                    console.log('Erro ao consultar avaliações: ', erro);
                    response.sendStatus(500).end();
                });
        }
        
    }
}