var express = require('express');
var router = express.Router();
const axios = require('axios');


/* GET home page. */
router.get('/', async function(req, res, next) {
    var data = await axios.get('http://clav-api.di.uminho.pt/v2/classes',{params: {nivel: 1, apikey: req.app.get('token')}})
    data = data.data
    res.render('index', { items: data });
});

router.get('/classes/:codigo', async function(req, res, next) {
    var data = await axios.get('http://clav-api.di.uminho.pt/v2/classes/c' + req.params.codigo, {params: {apikey: req.app.get('token')}})
    data = data.data
    res.render('classe', { classe: data });
})

module.exports = router;
