const express = require('express');
const morgan = require('morgan');


//express app
const app = express();

// listen for requests on port 3000
app.listen(3000);
// website address to type in browser: " localhost:3000/ "


//register view engine
app.set('view engine', 'ejs');


//middleware & static files
app.use(express.static('public'));

app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
  });

app.use((req, res, next) => {
    console.log('in the next middleware');
    next();
  });

app.use(morgan('dev'));


app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });


  app.get('/', (req, res) => {
    const blogs = [
      {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum something something'},
      {title: 'Mario finds stars', snippet: 'Lorem ipsum something something'},
      {title: 'How to defeat bowser', snippet: 'Lorem ipsum something something'},
      {title: 'Sample Blog Title_Asis', snippet: 'Sample blog snippet_Asis'},
    ];
    res.render('index', { title: 'Home', blogs });
  });
  
  app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
  });
  
  app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
  });


//404 page // must be always as the end, serves as catch all
app.use((req, res) => {
    res.status(404).render('404',  {title: '404'});

});
