const path = require('path');
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forcast = require('./utils/forecast')

const app = express()  // Called express method to inject express into the app
const port = process.env.PORT || 3000 //taking port from env variable for heroku
const publicDirPath = path.join(__dirname, '../public/')  // setting path to static files
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')  // setting up view engine
app.set('views', viewsPath)  // setting up views path to point to template directory( if we use default name views then this step is not required)
app.use(express.static(publicDirPath))  // middleware to take static path

hbs.registerPartials(partialPath)  // Setting path to partial files

app.get('',(req, res) => {
    res.render('index',{
        title: 'Home Page',
        name: 'Dimple Sharma'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About Page',
        name: 'Dimple Sharma'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title: 'Help Page',
        name: 'Dimple Sharma'
    })
})

app.get('/weather',(req, res) => {
    if( !req.query.address ){
        return res.send({
            'err': 'Address is required'
        })
    }
    geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
        if(err){
            return res.send({
                'err':err
            })
            
        }
        forcast({latitude, longitude, location}, (err, forecastData) => {
            if(err){
                return res.send({
                    'err':err
                })
            }

            res.send({
                'location':location,
                'forecast_data': forecastData
            })
            
        })
    })

})

app.get('/me',(req, res) => {
    if(!req.query.name){
        return res.send({
            'err':'Name is required'
        })
    }
    res.send({
        'name':'dimple'
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404_page',{
        title:'Error Page',
        name: 'Dimple Sharma',
        message:'Error 404: Page not found for help route'
    })
    
})

app.get('*',(req, res)=>{
    res.render('404_page',{
        title:'Error Page',
        name: 'Dimple Sharma',
        message:'Error 404: Page not found'
    })
})

app.listen(port, () => {
    console.log('Server started at port ' + port)
})