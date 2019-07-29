const request = require('request');


const geoCode = (location, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiZG9tbHIiLCJhIjoiY2p5Mm8yeGVpMGtmdjNqbzNnZWkyenh1ZiJ9.5izziQG83Qil_FMQ1gdNcw&limit=1`;

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