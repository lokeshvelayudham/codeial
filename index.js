const express = require('express');
// to access cookies in the site
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
// layout for ejs(embedede javascript instead of html)
const expressLayouts = require('express-ejs-layouts');
// to configure db
const db = require('./config/mongoose');

app.use(express.urlencoded());

// cookie parser used to access cookies in the webpage to server
app.use(cookieParser());

// acceseing static files such as css images js
app.use(express.static('./assets'));

app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// use express router
app.use('/', require('./routes'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
