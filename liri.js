var request = require("request");
var Spotify = require("node-spotify-api");
var {spotifyKeys, twitterKeys} = require("./keys.js");
var Twitter = require('twitter');
var fs = require("fs");

var operator = process.argv[2];
var nodeArgs = process.argv;

// If statements to match the 3rd argument in the command and run a specific function //
if (operator === "my-Tweets") {
    myTweets();
}

if (operator === "movie-this") {
    movie();
}

if (operator === "spotify-this-song"){
    spotifyApp();
}

if (operator === "do-what-it-says") {
    doWhatItSays();
}

// Twitter function with keys and other information to be able to access the feeds //
function myTweets() {
var twitter = new Twitter({
  consumer_key: (twitterKeys.consumer_key),
  consumer_secret: (twitterKeys.consumer_secret),
  access_token_key: (twitterKeys.access_token_key),
  access_token_secret: (twitterKeys.access_token_secret)
});

// URL used to return userinformation //
var queryUrl = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=JohnSmi22247527&count=1&trim_user=true';

// Request to get tweet information //
twitter.request(queryUrl, function(error, tweets, response) {
      if (!error) {
        // Used to log the tweets that were sent from the request. I was unable to pull the created_at and text //
        console.log(JSON.parse(tweets.body));
    }
});
};

// Movie function that passes through all the arguments that have been entered //
function movie(nodeArgs) {
var nodeArgs = process.argv;

var movieName = "";

//If the 4th argument is blank, entere Mr. Nobody as the default //
if (nodeArgs.length === 3) {
   movieName += "Mr.+Nobody"
   }

   // Otherwise, start at the place whenre the movie title was entered and add a + between every word //
   else {
        for (var i = 3; i < nodeArgs.length; i++) {
        if (nodeArgs.length - 1 === i) {
        movieName += nodeArgs[i]
        }
        else {
        movieName += nodeArgs[i] + "+"
        }
  }
  }

// Then run a request to the OMDB API with the movie specified //
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

request(queryUrl, function(error, response, body) {

  // If the request is successful //
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover Title, Release Year, etc etc //
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
  }
});
};


 // Function that initiates Spotify by passing through the arguments //
function spotifyApp(nodeArgs) {
var nodeArgs = process.argv;
// Create an empty variable for holding the song name //
var songName = "";

// Loop through all the argument and if the 4th one is blank enter the default Ase of Base//
if (nodeArgs.length === 3) {
   searchSong = "albums/0nQFgMfnmWrcWDOQqIgJL7"
   }

   // Otherwise, start at the place whenre the movie title was entered and add a + between every word //
   else {
        for (var i = 3; i < nodeArgs.length; i++) {
        if (nodeArgs.length - 1 === i) {
        songName += nodeArgs[i]
        }
        else {
        songName += nodeArgs[i] + "+"
        }
        searchSong = "search?q=" + songName + '&type=track&limit=1'
  }
  }

// Url used to find song by name //
var queryUrl = 'https://api.spotify.com/v1/' + searchSong;

var spotify = new Spotify({
  id: (spotifyKeys.id),
  secret: (spotifyKeys.secret)
});

// Request sent to Spotify to data that is returned is turned into a string Artist, Song Name, Preview Link, and Album name are then populated in command line //
spotify.request(queryUrl)
  .then(function(data) {
    console.log("\n--------------------------------------------------------------------");
    console.log("Artist(s) :" + JSON.stringify(data.tracks.items[0].artists[0].name, null, 2));
    console.log("\n--------------------------------------------------------------------");
    console.log("Song Name :" + JSON.stringify(data.tracks.items[0].name, null, 2));
    console.log("\n--------------------------------------------------------------------");
    console.log("Preview Link :"+ JSON.stringify(data.tracks.items[0].external_urls.spotify, null, 2));
    console.log("\n--------------------------------------------------------------------");
    console.log("Album Name :"+ JSON.stringify(data.tracks.items[0].name, null, 2));
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err);
  });
};

//File source ("FS")
function doWhatItSays() {
var nodeArgs = [];
    // Read method for target file random.txt //
    fs.readFile("random.txt", 'utf8', function(error, data) {
        if(error) {
            return console.log(error);
        }
        // create a variable for data coming from random.txt file //
        var dataArray = data.split(",");
        nodeArgs.push(dataArray[0]);
        })
        // Calling Spotify App with data from random.txt file. Doesn't want to work and I tried many different ways to get it going //
        spotifyApp(nodeArgs);
    };

