import http from 'http';
import axios from 'axios';
import {isStaticResource, serveStaticResource, getPOSTInfo} from './aux.js';

function generateForm(editData) {


    var html = `
        <div class="formContainer">
            <form action="/" method="POST">
                <div class="child">
                    <label for="id"><b>Identificador</b></label><br>
                    <label for="who"><b>Nome</b></label><br>
                    <label for="dateDued"><b>Data de Conclusão</b></label><br>
                    <label for="what"><b>Descrição</b></label>
                    
                </div>

                <div class="child" id="fields">
                    <input type="text" name="id" ${editData ? 'value="' + editData.id + '"' : ""}><br>
                    <input type="text" name="who" ${editData ? 'value="' + editData.who + '"' : ""}><br>
                    <input type="date" name="dateDued" ${editData ? 'value="' + editData.dateDued + '"' : ""}><br>
                    <input type="text" name="what" ${editData ? 'value="' + editData.what + '"' : ""}>
                </div>

                <div class="child" id="submitButtons">
                    <input type="submit" value="Registar"/><br>
                    <input type="reset" value="Limpar valores"/><br> 
                    <button type="submit" formaction="/update">Atualizar</button>
                </div>
            </form>
        </div>`

    return html
}

async function generateMainPage(editData) {
    var doneTasks = await axios.get('http://localhost:3000/tarefas?type=done')
    var todoTasks = await axios.get('http://localhost:3000/tarefas?type=todo')

    doneTasks = doneTasks.data
    todoTasks = todoTasks.data
    
    var html = `<html>
    <head>
        <title>TPC4</title>
        <meta charset="UTF-8">
        <link rel="icon" href="TODOList.jpg"/>
        <link rel="stylesheet" href="style.css"/>
    </head>
    <body>`
    
    html += generateForm(editData)
    
    html += `
        <h1 id="title">
            Lista de tarefas
        </h1>
        <div class='parent'>`

    var htmlBlock = `
            <div class='child'>
                <h1 class="taskBlock">Tarefas Por Completar</h1>`
    
    todoTasks.forEach(el => {
        htmlBlock += `
        <div class="container parent" id="todoTasks">
            <div class="child">
                <ul>
                    <li>
                        Identificador: ${el.id}
                    </li>
                    <li>
                        Data Criada: ${el.dateCreated}
                    </li>
                    <li>
                        Data Limite: ${el.dateDued}
                    </li>
                    <li>
                        Quem: ${el.who}
                    </li>
                    <li>
                        Descrição: ${el.what}
                    </li>
                </ul>
            </div>
            <div class="child">
                <form action="/done/${el.id}" method="POST">
                    <input type="submit" value="Check"/>
                </form>
                <form action="/delete/${el.id}" method="POST">
                    <input type="submit" value="Delete"/>
                </form>
                <form action="/edit/${el.id}" method="POST">
                    <input type="submit" value="Edit"/>
                </form>
            </div>
        </div>`
    })

    htmlBlock += `
            </div>
            <div class='child'>
                <h1 class="taskBlock">Tarefas Completas</h1>`

    doneTasks.forEach(el => {
        htmlBlock += `
                <div class="container parent" id="doneTasks">
                    <div class="child">
                        <ul>
                            <li>
                                Identificador: ${el.id}
                            </li>
                            <li>
                                Data Criada: ${el.dateCreated}
                            </li>
                            <li>
                                Data Limite: ${el.dateDued}
                            </li>
                            <li>
                                Quem: ${el.who}
                            </li>
                            <li>
                                Descrição: ${el.what}
                            </li>
                        </ul>
                    </div>
                    <div class="child">
                        <form action="/delete/${el.id}" method="POST">
                            <input type="submit" value="Delete"/>
                        </form>
                        <form action="/done/${el.id}" method="POST">
                            <input type="submit" value="Uncheck"/>
                        </form>
                    </div>
                </div>`
    })

    htmlBlock += `
            </div>
        </div>`

    html += htmlBlock
    html += `
    </body>
</html>`

    return html
}




var isEdit = false
var formData = undefined

http.createServer(async function(req, res) {
    var url = new URL(req.url, `http://${req.headers.host}`);
    console.log("Received " + req.method + " request with pathname: " + url.pathname)
    var d = new Date().toISOString().substring(0, 10)
    
    var tokens = url.pathname.split('/');
    console.log(tokens)

    if(isStaticResource(url.pathname)) {
        serveStaticResource(url.pathname,res)
    }

    else {
    
        if(url.pathname == "/") {

            if(isEdit) {
                isEdit = false
            }
            else {
                formData = undefined
            }

            console.log("Entrei aqui")
            
            if(req.method == "GET") {

                generateMainPage(formData).then(html => {
                    res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'})
                    res.write(html)
                    res.end()
                })
                .catch((err) => {
                    res.writeHead(500, {'Content-type': 'text/html;charset=utf-8'})
                    res.write('<p>Erro no GET<p><p><a href="/">Voltar</a></p>')
                    res.end()
                    console.log(err)
                })

            }

            else if(req.method == "POST") {

                if(req.url === "/") {
                    getPOSTInfo(req, result => {
                        result['dateCreated'] = d
                        result['type'] = "todo"
                        console.log("POST de aluno:" + JSON.stringify(result))
                        axios.post('http://localhost:3000/tarefas', result)
                        .then(resp => {
                            res.writeHead(301, {'Location': 'http://localhost:12500/'})
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write('<p>Erro no POST: ' + erro + "</p>")
                            res.write('<p><a href="/">Voltar</a></p>')
                            res.end()
                        })
                    })
                }
                else {
                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>POST não suportado.</p>')
                    res.write("<p><a href="/">Voltar</a></p>")
                    res.end()
                }

            }
    
        }
    
        else if(/done\//.test(url.pathname)) { 

            var tokens = url.pathname.split("/")
            var id = tokens[tokens.length - 1]
    
            var todoTask = await axios.get('http://localhost:3000/tarefas?id='+id)

            todoTask = todoTask.data[0]

            if(todoTask["type"] == "done") {
                todoTask["type"] = "todo"
            }
            else {
                todoTask["type"] = "done"
            }

            axios.put('http://localhost:3000/tarefas/' + id,todoTask)
                 .then(function (response) {
                    console.log(response.data)
                    res.writeHead(301, {'Location': 'http://localhost:12500/'})
                    res.end()
                 })
                 .catch(function (error) {
                    console.log(error)
                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Erro no PUT: ' + error + "</p>")
                    res.write('<p><a href="/">Voltar</a></p>')
                    res.end()
                 })

        }

        else if(/delete\//.test(url.pathname)) {

            var tokens = url.pathname.split("/")
            var id = tokens[tokens.length - 1]

            axios.delete('http://localhost:3000/tarefas/' + id)
                 .then(function (response) {
                    console.log(response.data)
                    res.writeHead(301, {'Location': 'http://localhost:12500/'})
                    res.end()
                 })
                 .catch(function (error) {
                    console.log(error)
                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Erro no DELETE: ' + error + "</p>")
                    res.write('<p><a href="/">Voltar</a></p>')
                    res.end()
                 })

        }

        else if(/edit\//.test(url.pathname)) {

            var tokens = url.pathname.split("/")
            var id = tokens[tokens.length - 1]
    
            var todoTask = await axios.get('http://localhost:3000/tarefas?id='+id)

            todoTask = todoTask.data[0]

            formData = todoTask

            isEdit = true

            console.log("Form Data: " + JSON.stringify(formData))
            res.writeHead(301, {'Location': 'http://localhost:12500/'})
            res.end()

        }

        else if(/\/update/.test(url.pathname)) {

            getPOSTInfo(req,async result => {

                var todoTask = await axios.get('http://localhost:3000/tarefas?id='+result.id)

                todoTask = todoTask.data[0]

                result["dateCreated"] = todoTask.dateCreated
                result["type"] = todoTask.type
                
                console.log("PUT de aluno:" + JSON.stringify(result))
                axios.put(`http://localhost:3000/tarefas/${result.id}`, result)
                .then(resp => {
                    res.writeHead(301, {'Location': 'http://localhost:12500/'})
                    res.end()
                })
                .catch(erro => {
                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Erro no POST: ' + erro + "</p>")
                    res.write('<p><a href="/">Voltar</a></p>')
                    res.end()
                })

            })

        }

        else { 
            res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
            res.write('<p>Path não suportado.</p>')
            res.write("<p><a href="/">Voltar</a></p>")
            res.end()
        }
    }

}).listen(12500);