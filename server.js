// requiring express tool
const express = require('express');

// create express (backend) app
const app = express();

app.use(express.static(__dirname));

// set a root endpoint for our app
app.get('/', (req, res) => {
	res.send('ah real monsters!');
});

// set a page endpoint
app.get('/page', (req, res) => {
	res.sendFile('index.html', {root: './'})
});

app.get('/places', (req, res) => {
	res.sendFile('haunted.json', {root: './'})
});

// allow our app to listen for connection
app.listen(2300, () => { console.log('listening on ' + 2300)})
