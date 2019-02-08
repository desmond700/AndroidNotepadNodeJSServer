const express = require('express'),
bodyparser = require('body-parser'),
http = require('http'),
api = require('./server/routes/api'),
app = express();

app.use(bodyparser.json());

app.use('/api', api);

// Set Port
const port = process.env.PORT || 3000;
app.set('port', port);

var server = http.createServer(app);
server.listen(port, () =>  console.log(`Listening on port: ${port}`));

