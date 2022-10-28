// const bodyParser = require('body-parser');
// const cors = require('cors');

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
// app.use(bodyParser.json());
// app.use(cors());
// app.options('*', cors());
  
// /** POST API **/
// app.post("/post_api", function(req, res)  {
//     console.log('POST API');
//     // console.log(JSON.stringify( req.body));


//     res.send({ "STATUS" : 200 });
// })

/** GET API **/
// app.get("/get_api", function (req, res){
//     console.log('GET API');
//     res.sendStatus(200);
// })
  
// app.listen(3007, function(){
//   console.log("server is running on port 3007");
// })



var express = require("express");
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var cors = require('cors');



var app = express();
app.set('port',process.env.PORT || 3000);
app.set('view engine', 'html');
app.set('views',__dirname +'/public');

app.use(cors());
app.options('*', cors());
  

app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));

app.engine('html',require('ejs').renderFile);
app.use(express.static(path.join(__dirname,'public')));


var server = http.createServer(app);
server.listen(app.get('port'),'0.0.0.0',function(){
  console.log('Express server listening on port: '+ app.get('port'));
});

// GET APi's

app.get("/", function(req,res){
  res.render(__dirname + '/pages/login.html');
});
app.get("/register", function(req,res){
  // console.log(`/form`);
  res.render(__dirname + '/pages/register.html');
});

app.get("/home", function(req,res){
  res.render(__dirname + '/pages/home.html');
});

app.get("/cart",function(req,res){
  res.render(__dirname + '/pages/cart.html')
})

// GET APi's


