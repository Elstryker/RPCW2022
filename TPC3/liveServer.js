import http from 'http';
import fs from 'fs';
import axios from 'axios';

async function createHTMLAlunos() {
    var data = await axios.get('http://localhost:3000/alunos')
    
    data = data.data
    var html = `<html>
    <head>
        <title>TPC3</title>
        <meta charset="UTF-8">
    </head>
    <body style="background-color: rgb(185, 223, 248);">
        <h1>
            <a href="http://localhost:4000/">Voltar</a>
        </h1>
        <h1 style="margin: auto;text-align: center;">
            Alunos
        </h1>
        <table style="border: 1px solid; border-collapse: collapse;margin: auto;text-align: center;">
            <tr>
                <th style="border: 1px solid">id</th>
                <th style="border: 1px solid">nome</th>
                <th style="border: 1px solid">curso</th>
                <th style="border: 1px solid">instrumento</th>
            </tr>`

    data.forEach(e => { 
        html += `
            <tr>
                <td style="border: 1px solid">${e.id}</td>
                <td style="border: 1px solid">${e.nome.toUpperCase()}</td>
                <td style="border: 1px solid">${e.curso}</td>
                <td style="border: 1px solid">${e.instrumento}</td>
            </tr>`
    })

    html += `
        </table> 
    </body>
</html>`

    return html
}


async function createHTMLCursos() {
    var data = await axios.get('http://localhost:3000/cursos')
    
    data = data.data
    var html = `<html>
    <head>
        <title>TPC3</title>
        <meta charset="UTF-8">
    </head>
    <body style="background-color: rgb(185, 223, 248);">
        <h1>
            <a href="http://localhost:4000/">Voltar</a>
        </h1>
        <h1 style="margin: auto;text-align: center;">
            Cursos
        </h1>
        <table style="border: 1px solid; border-collapse: collapse;margin: auto;text-align: center;">
            <tr>
                <th style="border: 1px solid">id</th>
                <th style="border: 1px solid">nome</th>
                <th style="border: 1px solid">duracao</th>
                <th style="border: 1px solid">instrumento</th>
            </tr>`

    data.forEach(e => { 
        html += `
            <tr>
                <td style="border: 1px solid">${e.id}</td>
                <td style="border: 1px solid">${e.designacao}</td>
                <td style="border: 1px solid">${e.duracao}</td>
                <td style="border: 1px solid">${e.instrumento["#text"]}</td>
            </tr>`
    })

    html += `
        </table> 
    </body>
</html>`

    return html
}

async function createHTMLInstrumentos() {
    var data = await axios.get('http://localhost:3000/instrumentos')
    
    data = data.data
    var html = `<html>
    <head>
        <title>TPC3</title>
        <meta charset="UTF-8">
    </head>
    <body style="background-color: rgb(185, 223, 248);">
        <h1>
            <a href="http://localhost:4000/">Voltar</a>
        </h1>
        <h1 style="margin: auto;text-align: center;">
            Instrumentos
        </h1>
        <table style="border: 1px solid; border-collapse: collapse;margin: auto;text-align: center;">
            <tr>
                <th style="border: 1px solid">id</th>
                <th style="border: 1px solid">nome</th>
            </tr>`

    data.forEach(e => { 
        html += `
            <tr>
                <td style="border: 1px solid">${e.id}</td>
                <td style="border: 1px solid">${e["#text"]}</td>
            </tr>`
    })

    html += `
        </table> 
    </body>
</html>`

    return html
}


http.createServer(function(req, res) {
    var url = new URL(req.url, `http://${req.headers.host}`);
    console.log("Received request with pathname: " + url.pathname)
    
    var tokens = url.pathname.split('/');
    console.log(tokens)

    // var css = false

    let pattern = /favicon\.ico/;
    var doesMatch = url.pathname.match(pattern)

    if(!doesMatch) { 

        // let pattern = /\.css/;
        // doesMatch = url.pathname.match(pattern)

        // if(doesMatch)
        //     css = True;

        var pageURL = "."

        if(url.pathname == "/") { 
            pageURL += "/index.html"

            fs.readFile(pageURL, function(err, data) {

                if (err) {
                    console.log(err.message)
                    res.writeHead(404, {'Content-type': 'text/html;charset=utf-8'});
                    res.write(`<p>Erro na leitura de ficheiro...</p>\n<p><a href="http://localhost:12500/filmes">Voltar</a></p>`)
                }
    
                else {
                    res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'});
                    res.write(data);
                }
    
                res.end()
            })

        }

        else if(url.pathname == "/alunos" || url.pathname == "/alunos/") { 

            createHTMLAlunos().then(html => {

                const buff = Buffer.from(html, "utf-8");

                res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'});
                res.write(buff);

                res.end()

            })
        }

        else if(url.pathname == "/cursos" || url.pathname == "/cursos/") { 

            createHTMLCursos().then(html => {

                const buff = Buffer.from(html, "utf-8");

                res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'});
                res.write(buff);

                res.end()

            })
        }

        else if(url.pathname == "/instrumentos" || url.pathname == "/instrumentos/") { 

            createHTMLInstrumentos().then(html => {

                const buff = Buffer.from(html, "utf-8");

                res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'});
                res.write(buff);

                res.end()

            })
        }

    }
}).listen(4000);