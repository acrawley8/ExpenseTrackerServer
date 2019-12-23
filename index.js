const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/Expense');
require('./models/Config');
require('./models/Type');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true }).catch(error => {console.log("Error connecting to DB: ", error)});

const app = express();

app.use(bodyParser.json());

require('./routes/expenseRoutes.js')(app);
require('./routes/typeRoutes.js')(app);

if(keys.NODE_ENV === 'prod') {
	// Serve static production assets from React app
	app.use(express.static('client/build'));
	
	// Refer references to routes Node doesn't understand to React Router
	const path = require('path');
	app.get('*', (request, response) => {
		response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = keys.PORT || 5000
app.listen(PORT);