var express = require('express')
var app = express();
var bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./app/route/user.route');
app.use(passport.initialize());
require('./app/passport')(passport);
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use('/api/users', users);

const path = require('path');


const cors = require('cors')
// const corsOptions = {
// 	origin:'http://localhost:8080/api/devotion',
// 	optionSuccessStatus: 200
// }
// app.use(cors(corsOptions))

// Configuration the database
const dbConfig = require('./app/config/mongodb.config.js');
const mongoose = require('mongoose');


app.use(cors());
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, { useNewUrlParser: true , useUnifiedTopology: true })
.then(() => {
	console.log("Successfully connected to MongoDB.");
}).catch(err => {
	console.log('Could not connect to MongoDB.');
	process.exit();
});

require('./app/route/devotion.route.js')(app);
require('./app/route/church.lesson.route.js')(app);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// Create a Server
var server = app.listen(process.env.PORT || 8080, function(){
	var host = server.address().address
	var port = server.address().port

	console.log("App listening at http://%s:%s",host, port)

})
