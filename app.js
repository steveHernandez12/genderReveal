const PORT = 3000;
const MongoURL = 'mongodb://localhost:27017/test';
let express = require('express'),
    path = require('path'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    app = express();


app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/src', express.static(path.join(__dirname, 'src')));

MongoClient.connect(MongoURL, (err, db) => {
    console.log('connected correctly to DB', err);

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

    app.use((req, res) => {
        res.sendStatus(404);
    });

    app.listen(PORT,() => {
        console.log("Example app listening at http://localhost:%s", PORT)
    });
});

