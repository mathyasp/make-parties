// Initialize express
const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser');
const models = require('./db/models');

// Use "main" as our default layout
app.engine('handlebars', engine({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'handlebars');

// OUR MOCK ARRAY OF PROJECTS
var events = [
  { 
    title: "I am your first event", 
    desc: "A great event that is super fun to look at and good", 
    imgUrl: "https://i.pinimg.com/736x/8f/dc/25/8fdc2575e44431c6c08b4069efd42e75.jpg" 
  },
  { 
    title: "I am your second event", 
    desc: "A great event that is super fun to look at and good", 
    imgUrl: "https://i.pinimg.com/736x/8f/dc/25/8fdc2575e44431c6c08b4069efd42e75.jpg" 
  },
  { 
    title: "I am your third event", 
    desc: "A great event that is super fun to look at and good", 
    imgUrl: "https://i.pinimg.com/736x/8f/dc/25/8fdc2575e44431c6c08b4069efd42e75.jpg" }
]

// Index
app.get('/', (req, res) => {
  models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
    res.render('events-index', { events: events });
  })
})

// NEW
app.get('/events/new', (req, res) => {
  res.render('events-new', {});
});

// CREATE
app.post('/events', (req, res) => {
  console.log(req.body);
});

// CREATE
app.post('/events', (req, res) => {
  models.Event.create(req.body).then(event => {
    res.redirect(`/`);
  }).catch((err) => {
    console.log(err)
  });
})

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})