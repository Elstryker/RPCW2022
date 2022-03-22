var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET home page. */
router.get(["/","/musicas"], function(req, res, next) {
    axios.get('http://localhost:3000/musicas')
    .then(function(response) {
        var musicas = response.data
        res.render('musicas', { musicas: musicas, date: new Date().toISOString().substring(0, 10)});
    })
    .catch(function(err) {
        res.render('error', { error: err });
    })
});



module.exports = router;
