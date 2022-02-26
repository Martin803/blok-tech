const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.send('Beep Boop!')
})

app.get('/profile/:name', function (req, res) {
  var data = {age: 29, job: 'ufopiloot'}
res.render('profile', {person: req.params.name, data: data});
})

app.get('/login', (req, res) => {
res.send('login')
})

app.get('/contact', (req, res) => {
res.send('contact')
})

app.get('/formulier', (req, res) => {
res.send('formulier')
})

app.get('*', function(req, res){
  res.send('kutzooi pagina niet gevonden ERROR 404', 404);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})