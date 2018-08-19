var keys = require('./keys.js');
require('dotenv').config();

var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var client = new Twitter(keys.twitterKeys);
var input = process.argv;
var action = input[2];
var inputs = input[3];

// Possible commands for this liri app
switch (action) {
  case 'my-tweets':
    twitter(inputs);
    break;
  case 'spotify-this-song':
    spotify(inputs);
    break;
  case 'movie-this':
    movie(inputs);
  case 'do-what-it-says':
    doit();
    break;
  // Initial explanation to user of the options that they have and how to execute the commands.
  default:
    console.log(
      '\r\n' +
        "Try typing one of the following commands after 'node liri.js' : " +
        '\r\n' +
        "1. my-tweets 'any twitter name' " +
        '\r\n' +
        "2. spotify-this-song 'any song name' " +
        '\r\n' +
        "3. movie-this 'any movie name' " +
        '\r\n' +
        '4. do-what-it-says.' +
        '\r\n' +
        "Be sure to put the movie or song name in quotation marks if it's more than one word."
    );
}

function twitter(inputs) {
  var params = { screen_name: inputs, count: 10 };

  client.get('statuses/user_timeline', params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      for (i = 0; i < tweets.length; i++) {
        console.log(
          'Tweet: ' +
            "'" +
            tweets[i].text +
            "'" +
            ' Created At: ' +
            tweets[i].created_at
        );
        log(
          'Tweet: ' +
            "'" +
            tweets[i].text +
            "'" +
            ' Created At: ' +
            tweets[i].created_at
        );
      }
    } else {
      console.log(error);
    }
  });
}

function spotify(inputs) {
  var spotify = new Spotify(keys.spotifyKeys);
  if (!inputs) {
    inputs = 'Starboy';
  }
  spotify.search({ type: 'track', query: inputs }, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    }

    var songInfo = data.tracks.items;
    console.log('Artist(s): ' + songInfo[0].artists[0].name);
    console.log('\nSong Name: ' + songInfo[0].name);
    console.log('\nPreview Link: ' + songInfo[0].preview_url);
    console.log('\nAlbum: ' + songInfo[0].album.name);
    log('\nArtist(s): ' + songInfo[0].artists[0].name);
    log('\nSong Name: ' + songInfo[0].name);
    log('\nPreview Link: ' + songInfo[0].preview_url);
    log('\nAlbum: ' + songInfo[0].album.name);
  });
}

function movie(inputs) {
  var queryUrl =
    'http://www.omdbapi.com/?t=' +
    inputs +
    '&y=&plot=short&' +
    keys.IMBDkeys.key;

  request(queryUrl, function(error, response, body) {
    if (!inputs) {
      inputs = 'The Dark Knight';
    }
    if (!error && response.statusCode === 200) {
      console.log('Title: ' + JSON.parse(body).Title);
      console.log('\nRelease Year: ' + JSON.parse(body).Year);
      console.log('\nIMDB Rating: ' + JSON.parse(body).imdbRating);
      console.log('\nCountry: ' + JSON.parse(body).Country);
      console.log('\nLanguage: ' + JSON.parse(body).Language);
      console.log('\nPlot: ' + JSON.parse(body).Plot);
      console.log('\nActors: ' + JSON.parse(body).Actors);
      log('\nTitle: ' + JSON.parse(body).Title);
      log('\nRelease Year: ' + JSON.parse(body).Year);
      log('\nIMDB Rating: ' + JSON.parse(body).imdbRating);
      log('\nCountry: ' + JSON.parse(body).Country);
      log('\nLanguage: ' + JSON.parse(body).Language);
      log('\nPlot: ' + JSON.parse(body).Plot);
      log('\nActors: ' + JSON.parse(body).Actors);
    }
  });
}

function doit(inputs) {
  fs.readFile('random.txt', 'utf8', function(error, data) {
    if (error) {
      return console.log(error);
    }

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(',');

    // Each command is represented. Because of the format in the txt file, remove the quotes to run these commands.
    if (dataArr[0] === 'spotify-this-song') {
      var songcheck = dataArr[1].slice(1, -1);
      spotify(songcheck);
    } else if (dataArr[0] === 'my-tweets') {
      var tweetname = dataArr[1].slice(1, -1);
      twitter(tweetname);
    } else if (dataArr[0] === 'movie-this') {
      var movie_name = dataArr[1].slice(1, -1);
      movie(movie_name);
    }
  });
}

function log(logResults) {
  fs.appendFile('log.txt', logResults, error => {
    if (error) {
      throw error;
    }
  });
}
