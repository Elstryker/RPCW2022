var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
    var url = new URL(req.url, `http://${req.headers.host}`);
    console.log("Received request with pathname: " + url.pathname)
    
    var tokens = url.pathname.split('/');
    console.log(tokens)

    var css = false

    if(url.pathname != "/favicon.ico") { 
        pageURL = "index.html"

        if(url.pathname == "/filmes" || url.pathname == "/filmes/" || url.pathname == "/") { 
            pageURL = "index.html"
        }

        else { 
            let pattern = /f\d+/;
            var doesMatch = tokens[2].match(pattern)

            if (doesMatch) {
                pageURL = "./HTMLArchive/" + tokens[2] + ".html"
            }

            else { 
                css = true
                pageURL = "./HTMLArchive/" + tokens[2]
            }
        }

        fs.readFile(pageURL, function(err, data) {

            if (err) {
                console.log(err.message)
                res.writeHead(404, {'Content-type': 'text/html;charset=utf-8'});
                res.write(`<p>Erro na leitura de ficheiro...</p>\n<p><a href="http://localhost:12500/filmes">Voltar</a></p>`)
            }

            else {
                if (css) {
                    res.writeHead(200, {'Content-type': 'text/css;charset=utf-8'});
                }
                res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'});
                res.write(data);
            }

            res.end()
        })
    }
}).listen(12500);