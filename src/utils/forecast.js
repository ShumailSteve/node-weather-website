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
                                        const temp = response.body.currently.temperature
                                        const precip = response.body.currently.precipProbability
                                        
                                         callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + temp + ' °C Out. There is ' + precip + ' chances of rain.'   )
                                }
                            
                                
                        })
        }
    
        module.exports = forecast;

       
        // forecast(24.87, 67.11, (error, forecastData) => {
        //         if (error)
        //                 console.log(error);
        //         console.log(forecastData);
                
                        
        // })