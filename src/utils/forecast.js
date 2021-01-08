const request = require('request')

const forcast = ({latitude, longitude, location}, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=dd675302ed91ae3dccc9633f5ba4b960&query='+ encodeURIComponent(latitude.toString()) + ',' + encodeURIComponent(longitude.toString()) + '&units=f'
    request({url: url, json: true}, (err, response) => {
        if(err){
            callback("Unable to connect to weatherstack api", undefined)
        }
        else if(response.body.success === false){
            callback("Invalide value of latitude and longitude", undefined)
        }
        else{
            const data = response.body
            const response_str = "It is currently " + data.current.temperature + " degree F. It feels like " + data.current.feelslike + " degree F. Weather description: " + data.current.weather_descriptions[0]
            callback(undefined, response_str)
            
            
        }
        
        
    })

}

module.exports = forcast;