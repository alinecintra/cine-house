const express = require('express');
const controller = require('../controllers/avaliacao')();

const router = express.Router();

router.get('/', controller.get);
router.post('/', controller.create);
router.put('/:id', controller.update);

module.exports = router;