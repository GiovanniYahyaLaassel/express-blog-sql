const posts = require('../data/postsData');
// const { post, param } = require('../routers/posts');


// funzione (index)
const index = (req, res) => {
    console.log('Richiesta GET su /posts');
    res.json({
        count: posts.length,
        posts: posts,
    });
};

// funzione (show)
const show = (req, res) => {
    const param = parseInt(req.params.id )  
    const post = posts.find(p => p.id === param); // trovo il post che corrisponde 

    if(post) {
        console.log(`Richiesta GET su /posts/ ${param} (id) `); //monitoro la richiesta
        res.json(post);
    } 

     else {
        console.log(`Nessun post trovato con id: ${param}`);
        res.status(404).json({ error: `Nessun post trovato con id: ${param}` });
    }
};

// funzione (destroy)

const destroy = (req, res) => {
    const id = parseInt(req.params.id);
    const index = posts.findIndex(p => p.id === id); //trovo l'indice 

    if(index !== -1) {
        const deletedPosts = posts.splice(index, 1); // rimuovo il post degli array
        console.log(`Posts ${id} elimniato . Lista aggiornata: ${posts}` );  
        res.status(204).send();
    } else {
        console.log(`Posts con id ${id} non trovato`);
        res.status(404).json({error: `Posts con id ${id} non trovato.`});
    }
}

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