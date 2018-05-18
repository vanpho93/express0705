const express = require('express');
const { urlencoded } = require('body-parser');

const app = express();

app.use(urlencoded({ extended: false }));

app.locals.isDev = process.env.NODE_ENV !== 'production';
if (process.env.NODE_ENV !== 'production') {
    const reload = require('reload');
    reload(app);
}

app.set('view engine', 'ejs');

class Singer {
    constructor(name, isFamous, image, link) {
        this.id = Math.round(Math.random() * 10000) + '';
        this.name = name;
        this.image = image;
        this.link = link;
        this.isFamous = isFamous;
    }
}

const singers = [
    new Singer('JayKii', false, 'https://zmp3-photo.zadn.vn/thumb/240_240/avatars/0/b/0b2ec92891e0082881fa4608ac1faf8e_1512452640.jpg', 'https://mp3.zing.vn/nghe-si/JayKii'),
    new Singer('Sara Lưu', true, 'https://zmp3-photo.zadn.vn/thumb/240_240/avatars/5/a/b/9/5ab9e37a5d36cca1884d75cd5db5e2d5.jpg', 'https://mp3.zing.vn/nghe-si/luu-ngoc-duyen'),
    new Singer('OSAD', false, 'https://zmp3-photo.zadn.vn/thumb/240_240/avatars/9/9/6/2/9962b429d47f3382523c5691e1a6c337.jpg', 'https://mp3.zing.vn/nghe-si/OSAD'),
];

app.get('/learn', (req, res) => {
    res.render('learn', { name: 'Teo Nguyen', age: 10 });
});

app.get('/singers', (req, res) => {
    res.render('singers', { singers });
});

app.get('/add', (req, res) => res.render('create'));

app.post('/add', (req, res) => {
    const { name, image, link } = req.body;
    const singer = new Singer(name, false, image, link);
    singers.push(singer);
    res.redirect('/singers');
});

app.get('/update/:id', (req, res) => {
    const singer = singers.find(s => s.id === req.params.id);
    if (!singer) return res.send('Khong tim thay singer');
    res.render('update', { singer });
});

app.post('/update/:id', (req, res) => {
    const singer = singers.find(s => s.id === req.params.id);
    if (!singer) return res.send('Khong tim thay singer');
    const { name, link, image } = req.body;
    singer.name = name;
    singer.image = image;
    singer.link = link;
    res.redirect('/singers');
});

app.get('/remove/:id', (req, res) => {
    const index = singers.findIndex(singer => singer.id === req.params.id);
    if (index === -1) return res.send('Khong tim thay singer');
    singers.splice(index, 1);
    res.redirect('/singers');
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
app.listen(process.env.PORT || 3000, () => console.log('Server started'));
