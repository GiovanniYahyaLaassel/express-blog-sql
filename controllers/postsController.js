const dataBase = require('../database');
// const { post, param } = require('../routers/posts');


// Funzione Index per recuperare i post dal database
const index = (req, res) => {
    console.log('Richiesta GET su /posts');

       // Eseguo la query al database per ottenere tutti i post
       dataBase.query('SELECT * FROM posts', (err, results) => {
        if (err) {
            console.error('Errore nella query:', err);
            return res.status(500).json({ error: 'Errore nel recupero dei post' });
        }

        // Restituisco i post in formato JSON
        res.status(200).json({
            count: results.length,
            posts: results, 
        });
        
    });
};

// funzione (show)
const show = (req, res) => {

    // Funzione (show) per restituire un singolo post

    const id = parseInt(req.params.id); // Ottengo l'ID del post dalla richiesta

    // Eseguo la query per recuperare il post con l'ID specificato
    dataBase.query('SELECT * FROM posts WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Errore nella query di recupero del post:', err);
            return res.status(500).json({ error: 'Errore nel recupero del post' });
        }

        if (result.length === 0) {
            // Se non trovo  il post, restituisco errore 404
            return res.status(404).json({ error: `Post con id ${id} non trovato` });
        }

        // Se il post è trovato, restituisco in formato JSON
        res.status(200).json(result[0]);
    });
};

// funzione destroy per eliminare un posts dal database

const destroy = (req, res) => {
    const id = parseInt(req.params.id);

// Funzione (destroy) per eliminare un post dal database

    // Eseguo la query per eliminare il post dal database
    dataBase.query('DELETE FROM posts WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Errore nella query di eliminazione:', err);
            return res.status(500).json({ error: 'Errore nell\'eliminazione del post' });
        }

        if (result.affectedRows === 0) {
            // Se il numero di righe  è 0, significa che il post non esiste
            return res.status(404).json({ error: `Post con id ${id} non trovato` });
        }

        // Se l'eliminazione è andata a buon fine, restituiamo il codice 204 (No Content)
        console.log(`Post con id ${id} eliminato.`);
        res.status(204).send(); 
    });
};

// funzione (store per creare un nuovo post)
const store = (req,res) => {
    console.log('Dati ricevuti nel body:',req.body);  //dati in arrivo
    // ottengo i dati
    const {title, content, image, tags} = req.body;

    // verifico i campi
    if (!title || !content) {
        return res.status(400).json({error:'Title, id e content sono obbligatori '});
    }

    // creo il nuovo post 
    const newPost = {
        id: posts.length +1,
        title,
        content,
        image: image || 'default.jpeg',
        tags: tags || []
    };

    posts.push(newPost);

    console.log('Nuovo post creato:', newPost);

    res.status(201).json(newPost);
}

const update = (req, res) => {
    
    const id = parseInt(req.params.id);
    const { title, content, image, tags } = req.body;

    const postIndex = posts.findIndex(p => p.id === id);

    if (postIndex !== -1) {
        posts[postIndex] = {
            ...posts[postIndex],
            title: title || posts[postIndex].title,
            content: content || posts[postIndex].content,
            image: image || posts[postIndex].image,
            tags: tags || posts[postIndex].tags,
        };

        console.log(`Post ${id} aggiornato:`, posts[postIndex]);
        res.json(posts[postIndex]);
    } else {
        console.log(`Post con id ${id} non trovato per aggiornamento`);
        res.status(404).json({ error: `Post con id ${id} non trovato.` });
    }
};
module.exports = { index, show, destroy, store, update };