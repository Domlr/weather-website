const request = require('request');

// //weather api

const forecast = (long, lat, callback)=> {

    const url = `https://api.darksky.net/forecast/918d555e923686accb18fe98e284b024/${lat},${long}?units=si`;

    request({url, json: true}, (err, {body}) => {

        if(err) {
           callback('unable to connect to weather service', undefined) 
        
        } else if(body.error){
            callback('unable to find location', undefined);
        } else {
            callback(undefined,`${body.daily.data[0].summary} it is currently ${body.currently.temperature} out. There is a ${body.currently.precipProbability}% chance of rain.`)
        }
    }
    )}

module.exports = forecast;