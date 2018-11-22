const express = require('express');
const app = express();

const hbs = require('hbs');

app.use(express.static('public'))

app.set('views', __dirname + '/views')
app.set('view engine', 'hbs')

const spotifyRoutes = require('./routes/routes')
app.use('/',spotifyRoutes)

app.listen(3000, () => {
    console.log('Listening on port 3000!')
})