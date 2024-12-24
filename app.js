// Configurazione base di express
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// abilito cors
app.use(cors());


// importo il router 
const postsRouter = require('./routers/posts');

// configuro body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());


//uso i middleware 
app.use(express.json());

// configuro il prefisso per tutte le rotte 
app.use('/posts', postsRouter);

// configuro cartella statica 
app.use(express.static('public'));

// Creo la rotta di base

app.get('/', (req, res) => {
    console.log('Richiesta GET su /');
    res.send('Server del mio blog');
});

app.listen(PORT, () => {
    console.log(`Server in funzione su : ${PORT} `);
});