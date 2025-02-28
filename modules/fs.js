const { error } = require('console');
const fs = require('fs');
const path = require('path')

//Criar uma pasta
/*
fs.mkdir(path.join(__dirname, '/teste'), (error) => {
    if(error){
    return  console.log('Erro: ', error);
    }
    console.log(`Pasta criada com sucesso`);
})
*/

//Criar um arquivo

/*
fs.writeFile(path.join(__dirname, '/teste', 'newFile.html'), 'hello node!', (error) => {
    if(error){
       return console.log('Erro: ', error);
    }
    console.log("Arquivo criado com sucesso");
});
*/


//Adicionar à um arquivo
/*
fs.appendFile(path.join(__dirname, '/teste', 'newfile3.html'), 'Hello Html', (error) => {
    if(error){
        return console.log('Erro:', error)
    }
    console.log('Arquivo modificado com sucesso');
}
)
*/
//Ler arquivo
fs.readFile(path.join(__dirname, '/teste', 'newFile.html'), 'utf8', (error, data) => {
    if(error){
        return console.log('Erro:', Error)
    }
    console.log(data);
})