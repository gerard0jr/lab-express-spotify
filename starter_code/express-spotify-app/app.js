var SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const app = express();

const hbs = require('hbs');

app.use(express.static('public'))

app.set('views', __dirname + '/views')
app.set('view engine', 'hbs')

const spotifyRoutes = require('./routes/routes')
app.use('/',spotifyRoutes)

// Remember to paste your credentials here
var clientId = '7d0496df2b1c42bab6fff39bf341c2d1',
    clientSecret = '3a98028a65de43de9365fb5d79223fc8';

var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});

// app.get('/',(req,res)=>{
//     res.send('Ironhack Spotify')
// })

app.listen(3000, () => {
    console.log('Listening on port 3000!')
})