const express = require("express")
const app = express()
const expressLayout = require('express-ejs-layouts')
const methodOverride = require('method-override')

require('dotenv').config()

const flash = require('express-flash');
const session  = require('express-session')
PORT = process.env.PORT

//db connection
const connectDB = require('./server/config/db')
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended :true}))
app.use(methodOverride('_method'))

//static files
app.use(express.static('public'))


//express session
app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, 
      },
    })
  );
  
  // setup flash
  app.use(
    flash({
      sessionKeyName: 'flashMessage'
    })
  );

//Template engines
app.use(expressLayout)
app.set('layout', './layout/main')
app.set('view engine', 'ejs')


//Routers
app.use('/', require('./server/routes/customer'))


//handle 404
app.get('*', (req, res)=>{
    res.status(404).render('404')
})


app.listen(PORT, ()=>{
    console.log(`Server is running on port  : ${PORT}`);
})
