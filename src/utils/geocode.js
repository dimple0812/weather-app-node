const request = require('request')

const geoCode = (address, callback ) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoiZGltcGxlc2hhcm1hMDgxMiIsImEiOiJja2l1ZWFqMzQwOHozMnptZW04MmpiaXJ6In0.7WrVOe3Giv5gCOycKDIp8Q&limit=1"
    
    request({url: url, json: true},(err,response) => {
        
        if(err){
            callback("Unable to connect to API", undefined)
        }

        else if(response.body.message === "Not Found"){
            callback("Invalid City parameter passed", undefined) 
        }
        else if(! response.body.features[0]){
            callback("Invalid City parameter passed. Try another search", undefined)
        }
        else{
            

            let data = response.body.features[0].center
            callback(undefined, {
                latitude: data[1],
                longitude: data[0],
                location: response.body.features[0].place_name
            })

            
        }
    })


}

module.exports = geoCode