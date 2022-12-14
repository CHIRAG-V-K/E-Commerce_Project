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

app.get("/loginWithOtp", function(req,res){
  res.render(__dirname + '/pages/loginOtp.html');
});
app.get("/register", function(req,res){
  res.render(__dirname + '/pages/register.html');
});

app.get("/home", function(req,res){
  res.render(__dirname + '/pages/home.html');
});

app.get("/cart",function(req,res){
  res.render(__dirname + '/pages/cart.html')
})


// GET APi's

// POST Api's

app.post("/otp",function(req,res){
  let otp = ("" + Math.random()).substring(2, 8);
  console.log("YOUR OTP:"+" "+ otp);
  res.send(otp);
})

// POST Api's