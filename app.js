`use strict`;

// 

require('dotenv').config();

// express 

const express = require('express')

// cors

const cors = require('cors')

const PORT = process.env.PORT;

const server = express();

server.use(cors());

server.get('/', (request, response) => {
    response.status(200).send('Hello everyone')
})

server.get('/location', (request, response) => {
    const locationData = require('./data/geo.json');
    const location = new Location(locationData);
    response.status(200).json(location);
})

function Location(data) {
    this.search_query = 'lynnwood';
    this.formatted_query = data.results[0].formatted_address;
    this.lat = data.results[0].geometry.location.lat
    this.lng = data.results[0].geometry.location.lng
}

server.get('/weather', (request, response) => {
    const weatherData = require('./data/darksky.json');
    const weather = new Weather(weatherData);
    response.status(200).json(weather);
})

function Weather(data) {
    this.search_query = 'lynnwood';
    this.forcast = data.daily.summary;
    this.time = new Date(data.daily.data[0].time*1022.1).toDateString();
}

server.get('/foo',(request,response) =>{
    throw new Error('ops');
})

server.use('*', (request, response) => {
    response.status(404).send('Not Found')
})

server.use((error,request,response) => {
    response.status(500).send(error)
})

server.listen(PORT, () => console.log(`app listening on ${PORT}`))