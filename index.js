const express = require('express');
const reload = require('reload');

const app = express();
reload(app);

app.set('view engine', 'ejs');

class Singer {
    constructor(name, image, link) {
        this.id = Math.round(Math.random() * 10000) + '';
        this.name = name;
        this.image = image;
        this.link = link;
    }
}

const singers = [
    new Singer('JayKii', 'https://zmp3-photo.zadn.vn/thumb/240_240/avatars/0/b/0b2ec92891e0082881fa4608ac1faf8e_1512452640.jpg', 'https://mp3.zing.vn/nghe-si/JayKii'),
    new Singer('Sara Lưu', 'https://zmp3-photo.zadn.vn/thumb/240_240/avatars/5/a/b/9/5ab9e37a5d36cca1884d75cd5db5e2d5.jpg', 'https://mp3.zing.vn/nghe-si/luu-ngoc-duyen'),
    new Singer('OSAD', 'https://zmp3-photo.zadn.vn/thumb/240_240/avatars/9/9/6/2/9962b429d47f3382523c5691e1a6c337.jpg', 'https://mp3.zing.vn/nghe-si/OSAD'),
];

app.get('/learn', (req, res) => {
    res.render('learn', { name: 'Teo Nguyen', age: 10 });
});

app.get('/singers', (req, res) => {
    res.render('singers', { singers });
});

/*
    app.get('/', (req, res) => {
        // res.sendFile(__dirname + '/public/a.html');
        res.render('home');
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
*/
app.listen(3000, () => console.log('Server started'));
