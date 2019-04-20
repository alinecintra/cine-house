const mongoose = require('mongoose');
const Historico = require('../models/Historico')();

module.exports = function () {
    return {
        create: function (request, response) {
            const historico = request.body;

            Historico.create(historico)
                .then(function () {
                    response.sendStatus(201).end();
                })
                .catch(function (erro) {
                    console.log('Erro ao criar histórico: ', erro);
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

            Historico.find(where).populate('usuario').populate('video')
                .then(function (historicos) {
                    response.json(historicos).end();
                })
                .catch(function (erro) {
                    console.log('Erro ao consultar historico: ', erro);
                    response.sendStatus(500).end();
                });
        }
        
    }
}