var twitter_bouba = require("./keys.js");
// Gets all of  twitterKeys from the keys.js file.
var twitterList = twitter_bouba.twitterKeys;


//var filePath = '/Users/boubacarbalde/Desktop/Homework/liri-node-app/log.txt'; 


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

	//fs.unlinkSync(filePath);

		var params = {screen_name: 'balde_boubs'};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
		    //console.log(tweets);

		    for (var i=0; i<4; i++){
		   //console.log(tweets[i].text);
		   //console.log("tweeted at :" + tweets[i].created_at);
				   fs.appendFile("log.txt", tweets[i].text + "\n", (err, value) => {
				   console.log(tweets[i].text);
			   	 	});

					fs.appendFile("log.txt", "tweeted at :" + tweets[i].created_at + "\n", (err, value) => {
					console.log("tweeted at :" + tweets[i].created_at);
			 		});
		    }

		  }
		});
}
//the_twits();

function the_spotify()
{
	//fs.unlinkSync(filePath);
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
    	fs.appendFile("log.txt", the_output[i].artists[0].name + "\n", (err, value) => {
			 		});

		console.log("The album that the song is from:" + " " + the_output[i].album.name);	
		fs.appendFile("log.txt", "The album that the song is from:" + " " + the_output[i].album.name+ "\n", (err, value) => {
					});

		console.log("The preview link of the song from Spotify:" + " " + the_output[i].album.external_urls.spotify);
	    fs.appendFile("log.txt", "The preview link of the song from Spotify:" + " " + the_output[i].album.external_urls.spotify+ "\n", (err, value) => {
					});
	   
	   console.log("The song's name:" + " " + the_output[i].name); 
	   fs.appendFile("log.txt", "The song's name:" + " " + the_output[i].name+ "\n", (err, value) => {
		 
			   	 	});
    	
    
			   	 	
   
}

});
}
//the_spotify();

function the_movie()
{
	//fs.unlinkSync(filePath);
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

   
  
    console.log("* Title of the movie:" +" "+ JSON.parse(body).Title);
	fs.appendFile("log.txt", "* Title of the movie:" +" "+ JSON.parse(body).Title+ "\n", (err, value) => {
			 		});

	console.log("* Year the movie came out:" + " "+ JSON.parse(body).Year);
    fs.appendFile("log.txt", "* Year the movie came out:" + " "+ JSON.parse(body).Year + "\n", (err, value) => {
			 		});

	console.log("* IMDB Rating of the movie:" + " "+ JSON.parse(body).imdbRating);
    fs.appendFile("log.txt", "* IMDB Rating of the movie:" + " "+ JSON.parse(body).imdbRating+ "\n", (err, value) => {
			 		});

    console.log("* Country where the movie was produced:" +" "+ JSON.parse(body).Title);
	fs.appendFile("log.txt", "* Country where the movie was produced:" +" "+ JSON.parse(body).Title + "\n", (err, value) => {
			 		});

	console.log("* Language of the movie:" +" "+ JSON.parse(body).Language);
    fs.appendFile("log.txt", "* Language of the movie:" +" "+ JSON.parse(body).Language+ "\n", (err, value) => {
			 		});

    console.log("* Plot of the movie:" +" "+ JSON.parse(body).Plot);
	fs.appendFile("log.txt", "* Plot of the movie:" +" "+ JSON.parse(body).Plot+ "\n", (err, value) => {
			 		});

    console.log("* Actors in the movie:" +" "+ JSON.parse(body).Actors);
    fs.appendFile("log.txt", "* Actors in the movie:" +" "+ JSON.parse(body).Actors+ "\n", (err, value) => {
			 		});

 	console.log("* Rotten Tomatoes Rating:" +" "+ JSON.parse(body).Ratings[1].Value);
 	fs.appendFile("log.txt", "* Rotten Tomatoes Rating:" +" "+ JSON.parse(body).Ratings[1].Value+ "\n", (err, value) => {
			 		});

	console.log("* Rotten Tomatoes URL:" +" "+ JSON.parse(body).tomatoURL);
	fs.appendFile("log.txt", "* Rotten Tomatoes URL:" +" "+ JSON.parse(body).tomatoURL+ "\n", (err, value) => {
			 		});

  }
});
}


function the_says()
{
	//fs.unlinkSync(filePath);

	fs.readFile("random.txt", "utf8", function(err, data) {
	var to_play= data;
  //});

	spotify.search({ type: 'track', query: to_play}, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }

    
    var the_output = data.tracks.items;
    for (var i=0; i<the_output.length; i++)
    {
    	console.log("Artist(s):" + " " +the_output[i].artists[0].name);	 
    	fs.appendFile("log.txt", the_output[i].artists[0].name + "\n", (err, value) => {
			 		});

		console.log("The album that the song is from:" + " " + the_output[i].album.name);	
		fs.appendFile("log.txt", "The album that the song is from:" + " " + the_output[i].album.name+ "\n", (err, value) => {
					});

		console.log("The preview link of the song from Spotify:" + " " + the_output[i].album.external_urls.spotify);
	    fs.appendFile("log.txt", "The preview link of the song from Spotify:" + " " + the_output[i].album.external_urls.spotify+ "\n", (err, value) => {
					});
	   
	   console.log("The song's name:" + " " + the_output[i].name); 
	   fs.appendFile("log.txt", "The song's name:" + " " + the_output[i].name+ "\n", (err, value) => {
		 
			   	 	});

    
}

});
});
}





