var express = require( "express" ),  
    nunjucks = require( "nunjucks" ),
    path = require( "path" ),
	request = require('request'),
	jsonq=require('jsonq'),
	fs = require('fs');
	var cors = require('cors');
app = express();
  // var nunjucksEnv = new nunjucks.Environment( new nunjucks.FileSystemLoader( path.join( __dirname, '/public' )));
app.use(cors());
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
  res.setHeader('Access-Control-Allow-Origin', '*');
     // Request methods you wish to allow
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

     // Request headers you wish to allow
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

     // Set to true if you need the website to include cookies in the requests sent
     // to the API (e.g. in case you use sessions)
     res.setHeader('Access-Control-Allow-Credentials', true);

     // Pass to next layer of middleware
    // next();
  next();
});



///////////////// write for render mobile
// var fs = require('fs');
var buildPage_enabled=false;  // false if un build mode
var buildPage=function(path,filename,data){
	fs.writeFile("../flowto_buildpage/"+path+filename, data, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("The file "+filename+" was saved!");
	}); 	
};

/////////////


app.all('/', function(req, res) {
	console.log(req.params);
  res.render('welcome.html',app_cfg);
});
app.get(/\/(.*\.html)/, function(req, res) {
  console.log(req.params[0]);
  var buildPage_enabled=true;
  if(buildPage_enabled){
  	    var htmlstring=nunjucks.render(req.params[0],app_cfg);
  	    res.send(htmlstring);
  	    buildPage('',req.params[0],htmlstring);
  	}else{
	    res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  		res.render(req.params[0],app_cfg);
  	}
 // res.render(req.params[0],app_cfg);
  
});
app.get('/test',function(req,res){
	request('http://www.google.com', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    console.log(body) // Show the HTML for the Google homepage.
	  }
	});
});
app.get('/map',function(req,res){
    var htmlstring=nunjucks.render("map.html",app_cfg);
    res.send(htmlstring);
});

app.listen(3000);

console.log('Server running at http://127.0.0.1:3000/');  
