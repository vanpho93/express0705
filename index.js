const express = require('express');
const reload = require('reload');

const app = express();
reload(app);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/public/a.html');
    res.render('home');
});

app.get('/learn', (req, res) => {
    // res.sendFile(__dirname + '/public/a.html');
    res.render('learn');
});

app.get('/chao/:name', (req, res) => {
    const { name } = req.params;
    res.send(`<h3>Chao ${name}</h3>`);
});

app.get('/cong/:soA/:soB', (req, res) => {
    const { soA, soB } = req.params;
    const kq = +soA + +soB;
    res.send('Ket qua = ' + kq);
});

app.listen(3000, () => console.log('Server started'));
