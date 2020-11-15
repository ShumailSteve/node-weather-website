const request = require('request')
const forecast = (lat, long, callback) =>
        {
            const url = 'https://api.darksky.net/forecast/491edb6ad79f07121aa6d46165979d1a/' + lat + ',' + long + '?units=si'

            request({ url, json: true}, (error, response) => 
                         {
                                
                                if (error)
                                {
                                     callback('Unable to Connect', undefined)
                                }
                                   
                                else if (response.body.error)
                                {
                                    callback('Unable to Find Loc, Try Aother', undefined)
                                }
                               else 
                                {
                                        const currentTemp = response.body.currently.temperature;
                                        const precip = response.body.currently.precipProbability;                                      
                                        const summary = response.body.daily.data[0].summary;
                                        const highTemp = response.body.daily.data[0].temperatureHigh;
                                        const lowTemp = response.body.daily.data[0].temperatureLow;

                                        // Weather details object 
                                        const weatherDetails = {
                                                latitude: lat,
                                                longitude: long,
                                                summary,
                                                currentTemp,
                                                highTemp,
                                                lowTemp,
                                                precip        
                                        }                                                             
                                        
                                        // callback(undefined, summary + ' It is currently ' + temp + ' °C Out. This high today is ' + highTemp + ' °C with a low of ' + lowTemp + ' °C. There is ' + precip + ' chances of rain.');
                                        callback(undefined, weatherDetails);
                                }                                                        
                        })
        }
    
        module.exports = forecast;

       
     