const fs = require('fs');
const { join } = require('path');
const pdf = require('pdf-parse');

/*
const dataBuffer = fs.readFileSync(
    join(__dirname, "/pdfs", "Fatura_9108884530983.pdf"));
module.exports.pdf(dataBuffer).then(data => {
    console.log(data.text); // A propriedade "text" contém o texto extraído do PDF
}).catch(error => {
    console.error('Erro:', error);
});
*/


/*
fs.readFile(join(__dirname, '/teste', 'newFile.html'), 'utf8', (error, data) => {
    if(error){
        return console.log('Erro:', Error)
    }
    console.log(data);
})
*/

module.exports.pdf = async function() {

    const filePath = join(__dirname, 'pdfs', 'Fatura_9108884530983.pdf');
    const dataBuffer = fs.readFileSync(filePath);
    try {
        const data = await pdf(dataBuffer);
        return data.text;
    } catch (error) {
        throw new Error(`Erro ao processar PDF: ${error.message}`);
    }
};
