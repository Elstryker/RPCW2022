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

    var template = `<!DOCTYPE html>
<html lang="en">
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
            Release year: ${year}
        </h2>
        <p>Elenco:</p>
        <ul>
${castHTML}
        </ul>
        <p>Géneros:</p>
        <ul>
${genresHTML}
        </ul>
    </body>
</html>`

    fs.writeFile("./HTMLArchive/f" + movieNumber + ".html",template,"utf8",function(err){
        if(err){
            console.log("Error writing")
        }
    })
}

movieNumber = 1

dataset.forEach(element => {
    createHTML(element,movieNumber)
    movieNumber++;
});