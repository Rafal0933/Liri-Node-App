var request = require("request");
var Spotify = require("node-spotify-api");
var {spotifyKeys, twitterKeys} = require("./keys.js");



// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var songName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s

if (nodeArgs.length === 2) {
   searchSong = "tracks/0hrBpAOgrt8RXigk83LLNE"
   }
   else {
        for (var i = 2; i < nodeArgs.length; i++) {
        if (nodeArgs.length - 1 === i) {
        songName += nodeArgs[i]
        }
        else {
        songName += nodeArgs[i] + "+"
        }
        searchSong = "search?q=" + songName + '&type=track&limit=1'
  }
  }

var queryUrl = 'https://api.spotify.com/v1/' + searchSong;
console.log(queryUrl);
var spotify = new Spotify({
  id: (spotifyKeys.id),
  secret: (spotifyKeys.secret)
});

spotify.request(queryUrl)
  .then(function(data) {
/*    console.log(JSON.stringify(data, null, 2));*/
    console.log("Artist(s): " + JSON.parse.album);
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err);
  });