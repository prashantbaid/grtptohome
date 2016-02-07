#!/usr/bin/env node

var program = require('commander');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var chalk = require('chalk');

program
    .option('-t, --traffic-model [model]', 'Assumptions to use when calculating time in traffic [best_guess|optimistic|pessimistic]', 'best_guess')
    .option('-m, --mode [mode]', 'Mode of transport [car|bus]', 'car')
    .option('-d, --destination [location]', 'Your destination')
    .parse(process.argv);

var queryParameters = {};
if (program.destination) {
    program.mode = program.mode === 'bus' ? 'transit' : 'driving';
    queryParameters['mode'] = program.mode;
    if (program.trafficModel === 'best_guess' || program.trafficModel === 'optimistic' || program.trafficModel === 'pessimistic')
        queryParameters['traffic_model'] = program.trafficModel;
    else
        queryParameters['traffic_model'] = 'best_guess';
    queryParameters['origins'] = '12.9852445,77.7406122';
    queryParameters['destinations'] = program.destination;
    queryParameters['departure_time'] = 'now';
    queryParameters['key'] = 'AIzaSyBhhsplX4bCnATkqeB3TgPc8YvwZO9B__E';
    var req = {
        url: 'https://maps.googleapis.com/maps/api/distancematrix/json',
        qs: queryParameters
    }
    var random = Math.floor((Math.random() * 10) + 0);
    var triviaArr = ['7104:tweets sent.', '484:instagram photos uploaded.', '2019:skype calls made.', '52768:google searches made.', '116483:youtube videos watched.', '2464588:emails sent.', '54806:facebook posts liked.', '405:hours of netflix watched', '1298:android apps downloaded', '666:iOS apps downloaded', '1457:tumblr posts created'];
    var trivSplitArr = triviaArr[random].split(':');
    var val = parseFloat(trivSplitArr[0]);
    var text = trivSplitArr[1];
    //console.log('req is ---', req);
    request.get(req, function(err, resp, body) {
        try {
            body = JSON.parse(body);
            var result = body.rows[0].elements[0];
            if (body.status && result.status === 'OK') {
                console.log('\nTime to reach home: ', chalk.green.bold(result.duration.text));
                if (program.mode === 'driving')
                    console.log('Duration you\'ll be stuck in traffic: ', chalk.green.bold(result.duration_in_traffic.text));
                console.log('\n[ Destination Address: ', body.destination_addresses.toString(), ']');
                console.log('\nRandom trivia: By the time you reach home there will be', chalk.magenta.bold(val * result.duration.value), text, '\n');
            } else {
                console.log('No results found for destination address -', program.destination);
            }

        } catch (e) {
            console.log('An error occurred -', e);
        }

    })
} else {
    program.help();
}