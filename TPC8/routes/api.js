var express = require('express');
var router = express.Router();
const Paragraph = require('../controllers/paragraph')

/* GET home page. */
router.get('/', function(req, res, next) {
    Paragraph.listar()
        .then(function(paragraph) {
            res.status(200).jsonp(paragraph);
        })
        .catch(function(err) {
            console.log(err.message)
            res.status(500).jsonp({ error:err.message });
        })
});

router.post('/', function(req, res, next) {
    Paragraph.inserir(req.body)
        .then(function() {
            res.status(201).jsonp(req.body)
        })
        .catch(function(err) {
            console.log(err.message)
            res.status(501).jsonp({ error:err.message });
        })
})

router.delete('/delete/:id', function(req, res, next) {
    Paragraph.delete(req.params.id)
        .then(function() {
            res.status(202).jsonp(req.params.id)
        })
        .catch(function(err) {
            console.log(err.message)
            res.status(502).jsonp({ error:err.message });
        })
})

router.put('/edit/:id', function(req, res, next) {
    Paragraph.edit(req.params.id, req.body)
        .then(function() {
            res.status(203).jsonp(req.params.id)
        })
        .catch(function(err) {
            console.log(err.message)
            res.status(503).jsonp({ error:err.message })
        })
})

module.exports = router;