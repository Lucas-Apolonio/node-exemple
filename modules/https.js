/*const http = require('http')
const pdfModule = require('./readpdfmodule');

const port = 8080;

const server = http.createServer(async (req, res) => {
    if(req.url == "/home"){
        res.writeHead(200, { "Content-Type": "application/json"});
        const pdfText = await pdfModule.pdf(req);
        res.end(JSON.stringify(pdfText.text))
    }
})

server.listen(port, () => console.log('Rodando o server'));
*/
const http = require('http');
const pdfModule = require('./readpdfmodule');

const port = 8080;

const server = http.createServer(async (req, res) => {
    if (req.url === "/home") {
        res.writeHead(200, { "Content-Type": "application/json" });

        try {
            console.log('Antes de chamar pdfModule.pdf');
            const pdfText = await pdfModule.pdf(); // Chama a função pdf()
            console.log('Depois de chamar pdfModule.pdf');

            res.end(JSON.stringify({ text: pdfText })); // Retorna o texto extraído do PDF
        } catch (error) {
            console.error('Erro ao processar PDF:', error);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(`Erro ao processar PDF: ${error.message}`);
        }
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Página não encontrada");
    }
});

server.listen(port, () => console.log(`Rodando o servidor na porta ${port}`));

