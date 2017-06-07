const request = require("request");

function findMyRepresentative(event, context){
    let location = {};
    request(`https://maps.googleapis.com/maps/api/geocode/json?address=${event.queryStringParameters.address}&key=${googleMapsKey}`,
     (error, response, body) => {
      location = JSON.parse(body).results[0].geometry.location;
      console.log(location);
      console.log(location.lat);
      console.log(location.lng);
      request(`https://openstates.org/api/v1/legislators/geo/?apikey=${openStatesKey}&lat=${location.lat}&long=${location.lng}`,
       (errorStates, responseStates, bodyStates) => {
        return(bodyStates);
      });
    });
}

exports.handler = findMyRepresentative();
