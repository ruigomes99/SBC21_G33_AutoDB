const XLSX = require("xlsx");

async function readExcel(fileName, callback) {
    const workbook = XLSX.readFile(__dirname + "/../excels/" + fileName + ".xlsx");
    const sheet_name_list = workbook.SheetNames;
    sheet_name_list.forEach(function (y) {
        let worksheet = workbook.Sheets[y];
        // getting the complete sheet

        let headers = {};
        let data = [];
        for (z in worksheet) {
            if (z[0] === "!") continue;
            // parse out the column, row, and value
            let col = z.substring(0, 1);

            let row = parseInt(z.substring(1));

            let value = worksheet[z].v;

            // store header names
            if (row == 1) {
                headers[col] = value;
                // storing the header names
                continue;
            }

            if (!data[row]) data[row] = {};
            data[row][headers[col]] = value;
        }
        // drop those first two rows which are empty
        data.shift();
        data.shift();
        callback(data);
    });
}

module.exports = {
    readExcel: readExcel
}