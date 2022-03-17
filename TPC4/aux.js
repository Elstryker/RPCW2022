import fs from 'fs';
import {parse} from 'querystring'

export function isStaticResource(url){
    return /(TODOList\.jpg)|(.+\.css)/.test(url)
}


export function serveStaticResource(url, res) {
    var tokens = url.split('/')
    var file = tokens[tokens.length -1 ]
    fs.readFile('public/' + file, (erro, dados)=>{
        if(erro){
            console.log('Erro: ficheiro não encontrado ' + erro)
            res.writeHead(404, {'Content-type': 'text/html;charset=utf-8'});
            res.write(`<p>Erro na leitura de ficheiro...</p>\n<p><a href="http://localhost:12500/">Voltar</a></p>`)
            res.end()

        }
        else{
            if(file == 'TODOList.jpg')
                res.setHeader('Content-Type', 'image/x-icon')
            res.end(dados)
        }
    })
}

export function getPOSTInfo(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', () => {
            console.log(body)
            callback(parse(body))
        })
    }
}