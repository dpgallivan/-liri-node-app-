//NPM needed requires 
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');

//Keys needed for Twitter
var keys = require('./keys.js');

var action = process.argv[2];
var value = process.argv[3];

//Activity 10.2 for reference
switch(action){
	case 'my-tweets':
		twitter();
	break;
		
	case 'spotify-this-song':
		Spotify();
	break;
		
	case 'movie-this':
		movies();
	break;
}

//Scripts for each NPM
	function twitter(){
		var client = new Twitter({
			consumer_key: 'xHlEli2wrdfje2EspzMx1x3Av',
			consumer_secret:'c9tGETIBCXkaCkMh6jmdK0UR9VGbpNmju4WYKLEsyfM8F60ZNR',
			access_token_key:'883485911375167488-ebjwoad30hgFHjO6ziwn6t51jqL3PO9', 
			access_token_secret:'jb8XzeEjTxUjP3HLKcue4itl6G4L7TpZfslbHIqpIqdwh'
		});
		var params = {screen_name: 'Dov Vah Kiin', count: 20};
		
		// console.log('retrieving tweets');

		client.get('statuses/user_timeline', function(error, tweets, response){
			// console.log('back from request');
		  // if(input === 'my-tweets'){
		  	if(error){
				console.log(error);
				return;
			}
		console.log(tweets[0].text);
		 	for(var i = 0; i < tweets.length; i++){
				console.log('===My Tweets ===');
				console.log(tweets[i].text);
			} 

		  // }		
		});
		// twitter();
	};
	
	function Spotify() {
		// console.log("this part is working");
		spotify.search({ type: 'track', query:'Ace of Base'}, function(err, data){
			if(err){
				console.log('Error occured: ' + err);
				return;
			} else {
				// for(var i = 0; i <data.tracks.items.length; i++) {
				var spotifyCall = data.tracks.items[i];
				
				console.log('=== Song and Artist Info ===')
				// var artist = spotifyCall.name;
				console.log('Artist: ' + spotifyCall.artists[0].name);
				
				// var recordSong = spotifyCall.name;
				console.log('Song: ' + spotifyCall.name);

				// var previewSong = spotifyCall.preview_url;
				console.log('Preview Song: ' + spotifyCall.preview_url);

				// var album = spotifyCall.album.name;
				console.log('Album: ' + spotifyCall.album.name);
				// }
			}
		});
	};
	
	function movies(){

		var movieName = value;
		var movieDefault = "Mr.Nobody";
		var url = 'http//:www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json';
		var urlDefault = 'http://www.omdbapi.com/?t=' + movieDefault + '&y=&plot=short&r=json';
		
		if(movieName != null){
			request(url, function(error, response, body){
		    	if (!error && response.statusCode == 200) {
				  var movieData = JSON.parse(info);
			      	console.log('=== Movie Info ===');
			      	console.log('Title: ' + value);
			        console.log('Year: ' + movieData['Year']);
			        console.log('IMDB Rating: ' + movieData['imdbRating']);
			        console.log('Country: ' + movieData['Country']);
			        console.log('Language: ' + movieData['Language']);
			        console.log('Plot: ' + movieData['Plot']);
			        console.log('Actors: ' + movieData['Actors']);
			        console.log('Rotten Tomatoes Rating: ' + movieData.tomatoRating);
			        console.log('Rotten Tomatoes URL: ' + movieData.tomatoURL);
				}
			});
			// console.log("where am i?")
		} else {
			request(urlDefault, function(error, response, body){
		    	if (!error && response.statusCode == 200) {
				  var movieData = JSON.parse(info);
			      	console.log('=== Movie Info ===');
			      	console.log('Title: ' + movieDefault);
			        console.log('Year: ' + movieData['Year']);
			        console.log('IMDB Rating: ' + movieData['imdbRating']);
			        console.log('Country: ' + movieData['Country']);
			        console.log('Language: ' + movieData['Language']);
			        console.log('Plot: ' + movieData['Plot']);
			        console.log('Actors: ' + movieData['Actors']);
				}
			});
		}
	};	