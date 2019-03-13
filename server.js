const express = require('express');
const next = require('next');
const useragent = require('express-useragent');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
// const cors = require('cors');

app.prepare().then(() => {
    const server = express();

    
    server.use(express.static('public'));
    // server.use(cors());

    // THIS IS THE DEFAULT ROUTE, DON'T EDIT THIS
    server.get('*', (req, res) => {
        return handle(req, res);
    });

    const port = process.env.PORT || 3000;
    server.listen(port, err => {
        if (err) throw err;
    });
}).catch(ex => {
    console.error(ex.stack);
    process.exit(1);
});