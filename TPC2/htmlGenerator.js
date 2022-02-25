const fs = require('fs');

const dataset = require('./cinemaATP.json')

function createHTML(movie,movieNumber) { 
    var title = movie.title
    var year = movie.year
    var cast = movie.cast
    var genres = movie.genres
    
    var castHTML = ""

    cast.forEach(element => {
        castHTML += `           <li>${element}</li>\n`
    })

    var genresHTML = ""

    genres.forEach(element => {
        genresHTML += `         <li>${element}</li>\n`
    })

    var template = `<html lang="en">
    <head>
        <title>${"f"+ movieNumber}</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <h1 id="title">
            ${title}
        </h1>
        <h2>
            Data de Lançamento: ${year}
        </h2>
        <p>Elenco:</p>
        <ul>
${castHTML}
        </ul>
        <p>Géneros:</p>
        <ul>
${genresHTML}
        </ul>
        <p><a href="http://localhost:12500/filmes">Voltar</a></p>
    </body>
</html>`

    fs.writeFile("./HTMLArchive/f" + movieNumber + ".html",template,"utf-8",function(err){
        if(err){
            console.log("Error writing")
        }
    })
}

function createHomePage(dataset){
    var html = `<html lang="en">
    <head>
        <title>Página Principal</title>
        <meta charset="UTF-8">
    </head>
    <body>
        <h1>Página Principal</h1>
        <ul>
`
    let movieNum = 1
    dataset.forEach(element => {
        html += `           <li>  <a href="http://localhost:12500/filmes/f${movieNum++}">${element.title}</a>  </li>\n`
    })
    html += `       </ul>
    </body>
</html>`

    fs.writeFile("./index.html", html, "utf-8", function(err) {
        if(err) {
            console.log("Error writing")
        }
    })
}

var data = dataset.sort(function(a, b) {
    var textA = a.title.toUpperCase();
    var textB = b.title.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
});

var movieNumber = 1

createHomePage(data)

data.forEach(element => {
    createHTML(element,movieNumber)
    movieNumber++;
});