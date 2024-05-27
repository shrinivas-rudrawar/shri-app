var express = require('express');
var app = express();

app.set('view engine', 'ejs');

const URL = process.env.BACKEND_URL || 'http://127.0.0.1:8000/api';

const fetch = ( ...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));

app.get('/', async function(req, res) {
    const options = {
        method: 'GET'
    };
    fetch(URL, options)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error('error : ' + err));
    try {
        let response = await fetch(URL, options);
        response = await response.json();
        res.render('index', response)
    } catch (err) {
        console.log(err);
        res.status(500).json({msg : 'Internal server error'});
    }
});
// var path = require('path');

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/public/index.html'));
// });

app.listen(3000, function(){
    console.log('shri listning on port 3000');
});