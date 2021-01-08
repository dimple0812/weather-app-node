const geoCode = require('./utils/geocode');
const forcast = require('./utils/forecast');

const getUserInput = () => {
    let args = process.argv
    if(process.argv.length === 2){
        console.log("City name not provided")
    }
    else{
        let city_name = args[2]
        console.log(city_name)
        geoCode(city_name, (err, {latitude, longitude, location}) => {
            if(err){
                console.log("Error: ", err)
                return 
            }
            console.log("Lat: "+ latitude + " Long: " + longitude + " Location: " +  location)
            forcast({latitude, longitude, location}, (err, forecastData) => {
                if(err){
                    console.log("Error: ", err)
                    return 
                }
                console.log("Location: ", location)
                console.log("Data: ", forecastData)
            })
            
        
        })
    }
}

getUserInput()




// -71.0596, 42.3605

    

