// Initialize express
require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const bodyParser = require('body-parser');

// require handlebars
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

// Use "main" as our default layout
app.engine('handlebars', engine({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
// Use handlebars to render
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
const models = require('./db/models');
require('./controllers/events')(app, models);

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

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})