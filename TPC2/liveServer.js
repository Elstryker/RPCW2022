var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
    switch (req.url) {
        case "/2": 
            page = "pag2"
            break;
        case "/3": 
            page = "pag3"
            break;
        case "/1":
        default:
            page = "pag1"
            break;
    }
    pageURL = "./arquivo/" + page + ".html"
    fs.readFile(pageURL, function(err, data) {
        res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'});
        if (err) {
            res.write("<p>Erro na leitura de ficheiro...</p>")
        }
        else {
            res.write(data);
        }
        res.end()
    })
}).listen(7777);