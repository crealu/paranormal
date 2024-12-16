// requiring express tool
const express = require('express');

// create express (backend) app
const app = express();

app.use(express.static(__dirname + '/public'));

const pageRoot = { root: './public/pages' };
const dataRoot = { root: './public/data' };

// set a root endpoint for our app
app.get('/', (req, res) => {
	// res.send('ah real monsters!');
	res.sendFile('us.html', pageRoot);
});

app.get('/us', (req, res) => {
	res.sendFile('us.html', pageRoot);
});

app.get('/sf', (req, res) => {
	res.sendFile('sf.html', pageRoot);
});

app.get('/places', (req, res) => {
	res.sendFile('haunted.json', dataRoot);
});

// allow our app to listen for connection
app.listen(2300, () => { console.log('listening on ' + 2300)})
