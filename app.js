'use strict';

var express = require('express');
var todoController = require('./controllers/todocontroller');

var app = express();

// set up template engine
app.set('view engine','ejs');

//static files
app.use(express.static(__dirname+'/public'));

//fire controller
todoController(app);


//listen to port 

const port = process.env.PORT || 8080;

app.set("host", process.env.HOST || "localhost");

app.listen(port, () => {
  console.log('Express server listening on port', port)
});

