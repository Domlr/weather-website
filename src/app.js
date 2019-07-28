const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handle bars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath)

//setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'dom'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'about',
        name: 'dom'
    })
})

app.get('/products', (req, res) =>{
    if(!req.query.search) {
       return res.send({
            error: 'must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})
app.get('/help', (req, res)=>{
    res.render('help', {
        help: 'I can not help',
        title: 'help',
        name: 'dom'
    })
})


app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
    
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
        })
        
})

app.get('/help/*',(req, res)=>{
    res.render('help404', {
        name: "bigboy",
        errorMsg:"page not found",
        title:"help 404"
    })
})
app.get('*', (req, res)=>{
    res.render('404', {
        name: "big bad one dom",
        errorMsg:"page not found",
        title:"404"

    })
})
app.listen(3000, ()=>{
});