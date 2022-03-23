//Menggunakan Express
const express = require('express');
const app = express();

// menggunakan database / menginport paket mysql untuk menghubungkan mysql
const mysql = require('mysql');  

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

//simpan info sambungan dalam constant connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'progate',
  password: 'password',
  database: 'list_app'
});

// Tambahkan route untuk halaman top
app.get('/',(req, res)=>{
  res.render('top.ejs');
});

//routing file index.ejs
app.get('/index', (req, res) => {
  connection.query(
    'SELECT * FROM items',
    (error, results) => {
      res.render('index.ejs', {items: results});
    }
  );
});

//routing file new.ejs
app.get('/new',(re, res)=>{
  res.render('new.ejs');
});


app.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO items (name) VALUES (?)',
    [req.body.itemName],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

//Menyambungkan server menggunakan method listen
app.listen(3000);
