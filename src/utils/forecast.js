const request = require('postman-request')


const forecast = (latitiude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=19f126b445d56e6326c163c6da0eb44d&query=' + latitiude + ',' + longitude + '&units=m'
    request({ url, json: true }, (error, { body }) => {
        if(error){
           callback('unable to connect to weather service', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions + '. It is ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees celcius. The wind speed is ' + body.current.wind_speed + ' km/h')
        }
    })

}

module.exports = forecast