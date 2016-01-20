var controller = require('./controller.js');
var express = require('express');
var app = express();

// Allow cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/data/:name', controller.getData);
app.get('/data/', controller.getDataList);


app.get('/', function(req, res){
  res.send('JS-Netsim.')
})

app.listen(process.env.PORT || 3000, function () {
  console.log('App listening!');
});

