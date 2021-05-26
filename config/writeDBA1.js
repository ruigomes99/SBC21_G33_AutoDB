const fs = require('fs');

async function writeDB(fileName, data) {
    let x = "";
    let output = "";
    data.forEach((item, index) => {
        delete item['ID'];
        //x += fileName + "(";
        x += "pedido('" + fileName + "', ";

        // Preco
        let preco = item['preco'];
        if (preco <= 7.0) {
            x += "'preco_baixo', ";
        } else {
            if (preco > 12.0) {
                x += "'preco_alto', ";
            } else {
                x += "'preco_medio', ";
            }
        }
        //

        // Duracao
        if (fileName.toLowerCase() === "levantar") {
            let duracaoMedia = (item['duracaoMin'] + item['duracaoMax']) / 2.0;
            if (duracaoMedia <= 10.0) {
                x += "'tempo_pouco', ";
            } else {
                if (duracaoMedia > 20.0) {
                    x += "'tempo_alto', ";
                } else {
                    x += "'tempo_medio', ";
                }
            }
        } else {
            let duracaoMedia = (item['duracaoMin'] + item['duracaoMax']) / 2.0
            if (duracaoMedia <= 20.0) {
                x += "'tempo_pouco', ";
            } else {
                if (duracaoMedia > 30.0) {
                    x += "'tempo_alto', ";
                } else {
                    x += "'tempo_medio', ";
                }
            }
        }
        //

        // classificacao
        let classificacao = item['classificacao'];
        if (classificacao <= 4.5) {
            x += "'classificacao_boa', ";
        } else {
            if (classificacao > 4.7) {
                x += "'classificacao_excelente', ";
            } else {
                x += "'classificacao_muito_boa', ";
            }
        }
        //

        // categorias
        let categorias = item['categorias'];
        x += '[';
        let splitArrayCat = categorias.split(',');
        for (i = 0; i < splitArrayCat.length; i++) {
            let addCategoria = splitArrayCat[i].trim().toLowerCase();
            addCategoria.replace("japonese", "japonesa");
            addCategoria.replace("italiano", "italiana");
            addCategoria.replace("saladas", "salada");
            addCategoria.replace("vegetariano", "vegetariana");
            if (i + 1 === splitArrayCat.length) {
                x += "'" + addCategoria + "'";
            } else {
                x += "'" + addCategoria + "', ";
            }
        }
        x += '], ';
        //

        // bebida
        let bebida = item['bebida'];
        if (bebida === "T") {
            x += "'com_bebida', ";
        } else {
            x += "'sem_bebida', ";
        }
        //

        // OUTPUT
        output = "'";
        for (j in item) {
            if (typeof (item[j]) === 'string') {
                switch (j.toLowerCase()) {
                    case "categoria":
                        output += '';
                        let splitArray = item[j].split(',');
                        for (i = 0; i < splitArray.length; i++) {
                            let addCategoria2 = splitArrayCat[i].trim().toLowerCase();
                            addCategoria2.replace("japonese", "japonesa");
                            addCategoria2.replace("italiano", "italiana");
                            addCategoria2.replace("saladas", "salada");
                            addCategoria2.replace("vegetariano", "vegetariana");
                            if (i + 1 === splitArray.length) {
                                output += addCategoria2;
                            } else {
                                output += addCategoria2 + ' N3XT ';
                            }
                        }
                        output += ' N3XT ';
                        break;
                    case "bebida":
                        if (item[j] === "T") {
                            output += 'true N3XT ';
                        } else {
                            if (item[j] === "F") {
                                output += 'false N3XT ';
                            } else {
                                output += item[j] + ' N3XT ';
                            }
                        }
                        break;
                    case "extras":
                        if (item[j] === "T") {
                            output += 'true N3XT ';
                        } else {
                            if (item[j] === "F") {
                                output += 'false N3XT ';
                            } else {
                                output += item[j] + ' N3XT ';
                            }
                        }
                        break;
                    default:
                        output += item[j] + ' N3XT ';
                        break;
                }
            } else {
                output += item[j] + " N3XT ";
            }
        }
        output = output.slice(0, -1);
        output += "'";
        // FINAL DO OUTPUT

        x += output + ").\n";
    })
    fs.writeFile(__dirname + "/../prolog/A1/" + fileName + '.pl', x, function (err) {
        if (err) {
            console.log(err)
        }
    });
}

module.exports = {
    writeDB: writeDB
}