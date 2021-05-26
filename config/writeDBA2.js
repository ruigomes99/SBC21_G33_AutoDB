const fs = require('fs');

async function writeDB(fileName, data) {
    let x = "";
    data.forEach((item, index) => {
        x += "data(['" + item.sexo + "', '" + item.idade + "', '" + item.dieta + "', '" + item.tempo + "', '" + item.preco + "', '" + item.categorias + "', '" + item.classificacao + "', '" + item.categoria_recomendada + "']).\n";
    })
    fs.writeFile(__dirname + "/../prolog/A2/" + fileName + '.pl', x, function (err) {
        if (err) {
            console.log(err)
        }
    });
}

module.exports = {
    writeDB: writeDB
}