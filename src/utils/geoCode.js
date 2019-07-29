const request = require('request');
const aws = require('aws-sdk');

let API = new aws.S3({
    apiKey: process.env.S3_KEY
  });

const geoCode = (location, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${API.apiKey}&limit=1`;

    request({url, json: true}, (err, {body}) => {
        if(err){
            callback('unable to connect to locations services', undefined)
        } else if(body.features.length === 0 ) {
            callback('no location found', undefined);
        } else {
            callback(undefined, {
            latitude: body.features[0].center[0],
            longitude: body.features[0].center[1],
            location: body.features[0].place_name
        })
        
    }})
}
module.exports = geoCode;
//hello