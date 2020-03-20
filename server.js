const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/novelish', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', function() {
  console.log("\nMongoDB database connection established successfully");
});

const user = require('./routes/user.routes');
const review = require('./routes/review.routes');

app.use('/user', user);
app.use('/review', review);

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('./error.html');
});

app.listen(PORT, function() {
  console.log("\nListening on port " + PORT+"...");
});