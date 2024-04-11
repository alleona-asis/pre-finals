const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')
const { render } = require('ejs');

//express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://aasis:asis.alleona0.@node-projects.hejde66.mongodb.net/node-projects?retryWrites=true&w=majority&appName=Node-Projects';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');


//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded ({ extended: true }));
app.use(morgan('dev'));


//mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });

//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });


// app.get('/single-blog', (req, res) => {
//     Blog.findById('6614e6fbbd284030918e0f9')
// });


//routes
app.get('/', (req, res) => {
    // res.send('<p>home page</p>');
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    // res.send('<p>about page</p>');
    res.render('about',  {title: 'About'});
});


//blog routes
app.use('/blogs', blogRoutes);


//404 page // must be always as the end as a catch all
app.use((req, res) => {
    res.status(404).render('404',  {title: '404'});

});
