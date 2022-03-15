const express = require('express')
const app = express()
const port = 3000
const dotenv = require('dotenv').config();
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
let db = null;

console.log(process.env.TESTVAR)

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/', async (req, res) => {

  const datavanform = await db.collection('formdata').find({}).toArray();

  res.render('profile')
})

app.post('/profile', async (req, res) => {
    // ADD MOVIE 
    let form = {
        vak: req.body.vak, 
        nat: req.body.nat, 
        hoelang: req.body.hoelang
    };
    // TODO
    await db.collection('formdata').insertOne(form);

    const datavanform = await db.collection('formdata').find().toArray();

    const title = "formdata";
    
    res.render('profile', {title, datavanform})
});

app.get('/profile', async (req, res) => {
    const profile = await db.collection('formdata').find().toArray();
    const title = "formdata";
    res.render('profile', {title, formdata});
})

app.get('/edit', (req, res) => {
    const title = "Profile Editor";
    res.render('edit', {title, interests});
})

// Aan de hand van de totorial van Sonja

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

// connect to database

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