const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000; // PORT assigned by Heroku || local port 

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlersbar engine and view location
app.set('view engine', 'hbs');  
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


//Setup Static Directory Path
app.use(express.static(publicDirPath));

// render index.hbs 
app.get('', (req, res) => {
        res.render('index', {
            title: 'Weather App',
            name: "SK"
        });    
})

//render about.hbs
app.get('/about', (req, res) => {
        res.render('about', {
           title: 'About Page',
           name: 'SK'
        });
})

//render help.hbs
app.get('/help', (req, res) => {
        res.render('help', {
            title: 'Help Page',
            helpText: 'This is some helpful text.',
            name: 'SK'
        });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) 
    {
        return res.send({
            Error: 'No address provided in Url '
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
                if (error)
                {
                    return res.send({ error })
                }
                forecast(latitude, longitude, (error, forecastData) => {
                        if (error)
                        {
                           return res.send({ error })
                        }
                        res.send({
                            forecast: forecastData,
                            location,
                            address: req.query.address
                        })
                    })
           })
        })

app.get('/help/*', (req, res) => {
    res.render('404 page', {
        title: '404',
        name: 'SK',
        errorMessage: "help article not found"
    })
})
app.get('*', (req, res) => {
        res.render('404 page', {
            title: '404',
            name: 'SK',
            errorMessage: "404 page Error"
        })

})

app.listen(port, () => {
    console.log("Server is up on port " + port);
    
})