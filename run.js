const excel = require('./config/readExcel.js')
const writeDBA1 = require('./config/writeDBA1.js')
const writeDBA2 = require('./config/writeDBA2.js')

async function readAndWriteDBA1(excelName) {
    const fileName = excelName;
    excel.readExcel(fileName, async function (result) {
        if (result) {
            writeDBA1.writeDB(fileName, result);
            console.log(`Ficheiro '${fileName}' escrito com sucesso`)
        } else {
            console.log(`Erro ao ler o excel '${fileName}'`);
        }
    })
};

async function readAndWriteDBA2(excelName) {
    const fileName = excelName;
    excel.readExcel(fileName, async function (result) {
        if (result) {
            writeDBA2.writeDB(fileName, result);
            console.log(`Ficheiro '${fileName}' escrito com sucesso`)
        } else {
            console.log(`Erro ao ler o excel '${fileName}'`);
        }
    })
};

readAndWriteDBA1("entregar");
readAndWriteDBA1("levantar");
readAndWriteDBA2("bd");