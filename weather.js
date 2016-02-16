
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

            console.log('Temperature Outside:', body.current_observation.temp_c + ' C');
            console.log('Weather is :', body.current_observation.weather);

			if (body.current_observation.temp_c >31 )
			{
				console.log('Day seem to be sunny!!', body.current_observation.temp_c);
			}
			else if (body.current_observation.temp_c >34) 
			{
				console.log('Its Very hot day, Dont dare to wear jackets !', body.current_observation.temp_c);

			}
			else if ( body.current_observation.weather === "Partly Cloudy") 
			{
				console.log('Its may rain, have umbrella handy');
			}
			else if (body.current_observation.weather ==="Clear") 
			{
				console.log('Good to gooooo');
			}

			else if (body.current_observation.temp_c < 25) 
			{
				console.log('Weather is super cool..Just Relaxxx');
			}
			

        } catch (e) {
            console.log('error occured', e);
        }


    })

}

weather();
module.exports = weather;
