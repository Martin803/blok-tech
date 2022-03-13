const express = require('express')
const app = express()
const port = 3000
const dotenv = require('dotenv').config();
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
let db = null;

console.log(process.env.TESTVAR)

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('home')
})


app.get('/profile/:name', function (req, res) {
  var data = {age: 29, job: 'ufopiloot'}
res.render('profile', {person: req.params.name, data: data});
})

app.get('/profile', function (req, res) {
res.render('profile')
})

app.get('/login', (req, res) => {
res.send('login')
})

app.get('/contact', (req, res) => {
res.send('contact')
})

app.get('/profielaanmaken', (req, res) => {
res.send('profielaanmaken')
})

app.get('*', function(req, res){
  res.send('kutzooi pagina niet gevonden ERROR 404', 404);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

async function connectDB() {
    const uri = process.env.DB_URI;
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    try {
        await client.connect();
        db = client.db(process.env.DB_NAME);
    } catch (error) {
        throw error;
    }
}

    connectDB().then(() => console.log("We have a connection to Mongo!"));

