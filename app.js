var express = require( "express" ),  
    nunjucks = require( "nunjucks" ),
    path = require( "path" ),
	request = require('request'),
	jsonq=require('jsonq');
app = express();
  // var nunjucksEnv = new nunjucks.Environment( new nunjucks.FileSystemLoader( path.join( __dirname, '/public' )));

  app_cfg ={
	'title':"FLOWTO",
	'asset_url':"http://127.0.0.1:3000/",
	'root_url':"http://127.0.0.1:3000/",
	'APP_OWNNER':"กระทรวงเกษตรและสหกรณ์",
	"APP_VERSION":"0.01 bata",
	"APP_DEVELOPER":"bird50",
	"APP_":""
  }
 	
	
//nunjucksEnv.express( app );
nunjucks.configure('templates', {
    autoescape: true,
	cache: false,
    express: app
});
app.use(express.static('assets_buje'));
app.use(express.static('assets_bird50'));

//var request = require('request');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.all('/', function(req, res) {
	console.log(req.params);
  res.render('welcome.html',app_cfg);
});
app.get(/\/(.*\.html)/, function(req, res) {
  console.log(req.params[0]);
  res.render(req.params[0],app_cfg);
  
});
app.get('/test',function(req,res){
	request('http://www.google.com', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    console.log(body) // Show the HTML for the Google homepage.
	  }
	});
});

app.listen(3000);

console.log('Server running at http://127.0.0.1:3000/');  
