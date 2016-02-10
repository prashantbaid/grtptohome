
var weather = function() {

    var sourceLatitude = '12.9852445'
    var sourceLongitude = '77.7406122'
    var request = require('request');



    var req = {
        url: 'http://api.wunderground.com/api/3e2689cc2eff0f77/conditions/forecast/alert/q/' + sourceLatitude + ',' + sourceLongitude + '.json'
    }


    request.get(req, function(err, resp, body) {

        try {
            body = JSON.parse(body);
            //console.log(body);

            console.log('Highest Temp:', body.current_observation.temp_c);

            console.log('Weather is :', body.current_observation.weather)

        } catch (e) {
            console.log('error occured', e);
        }


    })

}

// weather();
module.exports = weather;
