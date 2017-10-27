var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var appRoutes = require('./Server/Routes/api')(router);
var path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/wellness', function(err){
    if (err) {
        console.log('not connected to database: '+ err);
    } else {
        console.log(' connected to database ');
    }
});

app.get('*', function(req,res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'))

});


app.set('port', (process.env.PORT || 4000 ||  8080));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});