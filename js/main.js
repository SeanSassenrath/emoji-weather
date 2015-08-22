$(document).ready(function() {
  console.log("HELLO!");
  // getLocation();

  $('#zipcode').hide();
  $('#get-zip-weather').hide();

  $('#get-zip-weather').on('click', function(e) {
    e.preventDefault();
    var zipcode = $('#zipcode').val();
    console.log('Zipcode is ' + zipcode);
    weatherByZip(zipcode);
  });

  var weatherByZip = function(zipcode) {
    $.ajax({
      url: "http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode +",us,&APPID=d989efa9b6afbb8803d408c2a7168b59",
      type: 'GET',
      dataType: 'json',
    }).done(function(response) {
      console.log('success', response);
      $('#zipcode').show();
      $('#get-zip-weather').show();
      var currentTempFahrenheit = conversions.fahrenheit(response.main.temp);
      var maxTempFahrenheit = conversions.fahrenheit(response.main.temp_max);
      var minTempFahrenheit = conversions.fahrenheit(response.main.temp_min);
      // var icon = response.weather[0].icon;
      appendWeather(currentTempFahrenheit, maxTempFahrenheit, minTempFahrenheit, response.name);
    }).fail(function() {
      console.log('failed ', response);
    });
  };

  // function getLocation() {
  //     if (navigator.geolocation) {
  //         navigator.geolocation.getCurrentPosition(locationWeather);
  //     } else {
  //         console.log("Geolocation is not supported by this browser.");
  //     }
  // }

  var weatherByLocation = function(geolocation) {
    $.ajax({
      url: "http://api.openweathermap.org/data/2.5/weather?lat=" + geolocation.coords.lat +"&lon=" + geolocation.coords.lon +"&APPID=d989efa9b6afbb8803d408c2a7168b59",
      type: 'GET',
      dataType: 'json',
    }).done(function(response) {
      console.log('success', response);
      $('#zipcode').show();
      $('#get-zip-weather').show();
      var currentTempFahrenheit = conversions.fahrenheit(response.main.temp);
      var maxTempFahrenheit = conversions.fahrenheit(response.main.temp_max);
      var minTempFahrenheit = conversions.fahrenheit(response.main.temp_min);
      // var icon = response.weather[0].icon;
      appendWeather(currentTempFahrenheit, maxTempFahrenheit, minTempFahrenheit, response.name);
    }).fail(function() {
      console.log('failed ', response);
    });
  };

  var appendWeather = function(temp, maxTemp, minTemp, city) {
    $('#instructions').hide();
    $('#temp').empty();
    $('#city').empty();
    $('#max').empty();
    $('#min').empty();

    $('#temp').append('<h1 class="txt-center txt-lg m-lg txt-white">' + temp + '</h1>');
    $('#city').append(city);
    $('#max').append("hi " + maxTemp);
    $('#min').append("lo " + minTemp);
    // $('#icon').append('<img src="http://openweathermap.org/img/w/' + icon + '.png">');
  };

  var conversions = (function() {
    var fahrenheit = function(kelvin) {
      var kToFConversion = ((kelvin - 273.15) * 1.8 + 32);
      console.log('Converting ' + kelvin + ' Kelvin to ' + kToFConversion + ' Fahrenheit');
      return (Math.floor((kelvin - 273.15) * 1.8 + 32));
    }
    return {
      fahrenheit: fahrenheit
    }
  })()

});

var geolocation = (function() {

  var getLocation = function() {
      if (navigator.geolocation) {
          var location = navigator.geolocation.getCurrentPosition(latLon);
          console.log(location);
          return location;
      } else {
          console.log("Geolocation is not supported by this browser.");
      }
  };

  function latLon(position) {
    var coordinates = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }
    return coordinates;
  };

  return {
    coords: getLocation
  }
})()