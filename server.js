const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
  
app.listen(3333, () => {
    console.log('Application listening on port 3333!');
});