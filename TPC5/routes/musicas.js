var express = require('express');
var axios = require('axios')
var router = express.Router();

router.get('/inserir', function(req, res, next) {
    console.log("Inserir")
    res.render('musicaform', {})
})

router.get('/:id', function(req, res, next) {
	axios.get("http://localhost:3000/musicas/" + req.params.id)
		.then(response => {
			var musica = response.data
			res.render('musica', { musica: musica, date: new Date().toISOString().substring(0, 10)});
		})
		.catch(err => {
			res.render('error', { error: err });
		})
});

router.get('/prov/:prov', function(req, res, next) {
	axios.get("http://localhost:3000/musicas?prov=" + req.params.prov)
		.then(response => {
			var provs = response.data
			res.render('provincias', { provs: provs, date: new Date().toISOString().substring(0, 10), provincia: req.params.prov})
		})
		.catch(err => {
			res.render('error', { error: err });
		})
});

router.post('/', function(req, res, next) {
    axios.get("http://localhost:3000/musicas")
        .then(response => {
            requestContent = req.body
            resData = response.data
            id = resData.length + 1
            axios.post("http://localhost:3000/musicas",{
                "id": id,
                "tit":requestContent.tit,
                "prov": requestContent.prov
            })
                .then(res.redirect('/'))
                .catch(err => {
                    res.render('error', {error: err})
                })
        })
})

module.exports = router;