var twitter_bouba = require("./keys.js");
// Gets all of  twitterKeys from the keys.js file.
var twitterList = twitter_bouba.twitterKeys;



// Loop through twitterlist and print out details
// for (var key in twitterList) {
//   console.log("A " + key + " band is " + twitterList[key] + ".");
// }


var Twitter = require('twitter');
var spotify = require('spotify');
var request = require("request");
var fs = require('fs');

var action = process.argv[2];

switch (action) {
  case "my-tweets":
    the_twits();
    break;

  case "spotify-this-song":
    the_spotify();
    break;

  case "movie-this":
   the_movie();
    break;

  case "do-what-it-says":
    the_says();
    break;
}




function the_twits()
{
	var client = new Twitter(twitterList);

		var params = {screen_name: 'balde_boubs'};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
		    //console.log(tweets);

		    for (var i=0; i<4; i++){
		    	console.log(tweets[i].text);
		    	console.log("tweeted at :" + tweets[i].created_at);
		    }

		  }
		});
}
//the_twits();

function the_spotify()
{
	var that_song = process.argv[3];

	spotify.search({ type: 'track', query: that_song }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }

    //console.log(JSON.stringify(data, null, 2));
    var the_output = data.tracks.items;
    for (var i=0; i<the_output.length; i++)
    {
    console.log("Artist(s):" + " " +the_output[i].artists[0].name);
    console.log("The album that the song is from:" + " " + the_output[i].album.name);
    console.log("The preview link of the song from Spotify:" + " " + the_output[i].album.external_urls.spotify);
    console.log("The song's name:" + " " + the_output[i].name);
}

});
}
//the_spotify();

function the_movie()
{
	// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s

for (var i =2; i < nodeArgs.length; i++) {

 if(i<3)
 {
 	movieName = "Mr" + "+" + "Nobody";
 }

  else if (i > 3 && i < nodeArgs.length) {

    movieName = movieName + "+" + nodeArgs[i];

  }

  else {

    movieName = nodeArgs[3];

  }
}


var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&tomatoes=true";
//var queryUrl = "http://www.omdbapi.com/?t=fences&y=&plot=short&r=json&tomatoes=true";


console.log(queryUrl);


request(queryUrl, function(error, response, body) {




  // If the request is successful
  if (!error && response.statusCode === 200) {

   
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    //console.log("Release Year: " + JSON.parse(body).Year);
    console.log("* Title of the movie:" +" "+ JSON.parse(body).Title);
    console.log("* Year the movie came out:" + " "+ JSON.parse(body).Year);
    console.log("* IMDB Rating of the movie:" + " "+ JSON.parse(body).imdbRating);
    console.log("* Country where the movie was produced:" +" "+ JSON.parse(body).Title);
    console.log("* Language of the movie:" +" "+ JSON.parse(body).Language);
    console.log("* Plot of the movie:" +" "+ JSON.parse(body).Plot);
    console.log("* Actors in the movie:" +" "+ JSON.parse(body).Actors);
 	console.log("* Rotten Tomatoes Rating:" +" "+ JSON.parse(body).Ratings[1].Value);
    console.log("* Rotten Tomatoes URL:" +" "+ JSON.parse(body).tomatoURL);

  }
});
}


function the_says()
{
	

	fs.readFile("random.txt", "utf8", function(err, data) {
	var to_play= data;
  //});

	spotify.search({ type: 'track', query: to_play}, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }

    //console.log(JSON.stringify(data, null, 2));
    var the_output = data.tracks.items;
    for (var i=0; i<the_output.length; i++)
    {
    console.log("Artist(s):" + " " +the_output[i].artists[0].name);
    console.log("The album that the song is from:" + " " + the_output[i].album.name);
    console.log("The preview link of the song from Spotify:" + " " + the_output[i].album.external_urls.spotify);
    console.log("The song's name:" + " " + the_output[i].name);
}

});
});
}





