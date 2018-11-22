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
        spotifyApi.searchArtists(search)
        .then( data => {
        let artists = data.body.artists.items
        res.render('artists',{artists})
        })
        .catch( error => {
            console.log(error)
        })
        
    } else{
        res.render('home')
    }
})

router.get('/albums/:id', (req,res) => {
    const {id} = req.params
    spotifyApi.getArtistAlbums(id)
    .then( data => {
        let albums = data.body.items
        res.render('albums',{albums})
    })
    .catch( e => {
        res.send(e)
    })
})

module.exports = router