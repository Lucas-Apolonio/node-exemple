const express = require('express');
const multer = require('multer'); //Responsável por arquivo.
const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse');

const app = express();
const port = 8080;


//Configuração Multer
/*
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // pasta onde os arquivos serão salvos
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
*/
//////////////////////////////////////////////
// Cria o diretório de uploads se não existir
const uploadDir = path.join(__dirname, 'uploads');
if (!fs. existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir) // Usando o caminho absoluto
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  });
///////////////////////////////////

const upload = multer({ storage: storage });



app.post('/upload-pdf', upload.single('pdf'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('Nenhum arquivo foi enviado.');
    }
    res.send('Arquivo PDF recebido e salvo com sucesso.');
  });

  
app.post("/uploadpdf", upload.single('pdf'), async (req, res) => { 
    if (!req.file) {
        return res.status(400).send('Nenhum arquivo foi enviado.');
    }
    console.log(req.file.filename)
    console.log(req.file.path)
    console.log(req.file.buffer)

    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);

    try {
          const data = await pdf(dataBuffer);
          console.log(data.text)
    
          // Retorna o texto extraído como JSON
          res.status(200).json({ text: data.text });
          // Opcional: Remover o arquivo temporário após o processamento
          await fs.promises.unlink(req.file.path)
          return data.text;
          
        } catch (error) {
          throw new Error(`Erro ao processar PDF: ${error.message}`);
        }
    
})
//////////////////////-/////////////////////


app.get("/home", (resq, res) => {
    res.status(200).send("<h1>Teste com Express</h1>")
});

app.get("/users", (req, res) =>{
    const users = [
        {
            "nome": "lucas",
            "idade": "28"
        },
        {
            "nome": "gabriel",
            "idade": "23"
        }
    ]
    res.status(200).json(users)
})

app.use(express.json());; //Responsável por conseguir tratar o conteúdo enviado como json
app.post("/readpdf", (req, res) => {
    const dados = req.body;
    console.log(req);
    console.log(req.file)
    res.status(200).json(dados.nome)
})

app.listen(port, () => console.log(`Rodando com Express na porta ${port}`));