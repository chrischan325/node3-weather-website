const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('postman-request')
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express() //generate application

//Defining paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') //one line handlebars set up
app.set('views', viewsPath) //pointing express to our custom directory that isn't named views
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) //use customizes the server

app.get('', (req,res) =>{ //setting up route for index.hbs so user can see our view
    res.render('index', {
        title: 'Weather',
        name: 'Christian Chan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Christian Chan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'You lost? Need a map?',
        title: 'Help Page',
        name: 'Christian Chan'
    })
})
//now we can tell our express application what it should do

//app.com 
//app.com/help
//app.com/about

// app.get('', (req, res) => { //setting up routes 
//     res.send('Hello express')
// })

// app.get('', (req, res) => { //setting up routes 
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => { 
//     res.send([{
//         name:'Christian',
//         age: 27
//     },{
//         name: 'Sarah'
//     }
// ])
// })

// app.get('/about', (req, res) => { 
//     res.send('<h1>About Page</h1>')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please enter an address'
        })
    } 

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        } 
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name: 'Christian Chan',
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name: 'Christian Chan',
        error: 'Page not found'
    })
})

//start server:
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})




