# LiriBot

Liri Bot

Background:

Using node, I created a Liri Bot (much similar to Siri from iOS). The bot will understand and process several different commands from the terminal and output information from Twitter’s, Spotify’s and IMBD’s APIs, respectively. All search results are then successfully stored in the log.txt without deleting the previous search history.

The commands:

The commands the bot will process are:

Type in just “ node liri.js” will present the user with all the command options:

node liri.js movie-this 'movie title'
node liri.js spotify-this-song 'song title'
node liri.js my-tweets 'twitter username'

node liri.js do-what-it-says




All commands must be preceded by node liri.js

##my-tweets = which will yield the tweets and the time created stamps for a specified twitter user of your choice.

#spotify-this-song = which will yield the artist, song name, a preview link (if available), and album of the song searched.

##movie-this = will yield the title, release year, IMDB rating, country, language, plot and actors of the queried film.

##do-what-it-says = will yield the result of whatever is written in the random.txt file.










