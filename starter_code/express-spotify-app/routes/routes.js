var SpotifyWebApi = require('spotify-web-api-node')
const express = require('express')
const router = express.Router()

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

router.get('/', (req,res) => {
    const {search} = req.query
    if(search){
        spotifyApi.searchArtists(search, {limit: 2})
        .then( data => {
            console.log(data)
           // -res.render('artists',data)
        })
        .catch( error => {
            console.log(error)
        })
        
    } else{
        res.render('home')
    }
})

module.exports = router