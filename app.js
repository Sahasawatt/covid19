var createError = require('http-errors');
var express = require('express');


var indexRouter = require('./routers/index');

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', indexRouter);


app.listen(3000, () => {
    console.log(`Sever running on port : ` + 3000);
  });

app.use(function(req, res, next) {
  next(createError(404));
});




app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).send(err.message);
});




module.exports = app;
