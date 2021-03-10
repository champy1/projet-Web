const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const ClientRouter = require('./routes/client');
const EmployeRouter = require('./routes/employe');
const GestionnaireRouter = require('./routes/gestionnaire');
const LivreurRouter = require('./routes/livreur');

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/assets', express.static(__dirname + 'public/assets'))
app.use(bodyParser.urlencoded({ extended: true }))


app.set('views', './views')
app.set('view engine', 'ejs')

app.use('/', ClientRouter);
app.use('/', EmployeRouter);
app.use('/', GestionnaireRouter);
app.use('/', LivreurRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  const status = err.status || 500;
  res.status(status);
  res.render('error', { title: `Error ${status}` });
});

app.listen(port, () => console.info(`Lancé sur le port ${port}`))

module.exports = app;