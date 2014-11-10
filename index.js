var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/results', function(request, response) {
  var data = require('fs').readFileSync('results.json', 'utf8');
  response.send(data);
});
app.post('/results', function(request, response) {
  var fs = require('fs');
  request.pipe(fs.createWriteStream('results.json', {flags:'a'}))
    .once('finish', function(){
      response.send(201);
    });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
