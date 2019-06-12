function updateTempInWidget(p_latitude, p_longitude){
    var latitude;
    var longitude;

    if(latitude && longitude){
        latitude = p_latitude;
        longitude = p_longitude;
    } else {
        latitude = '55.6050';
        longitude = '13.0038'; 
    }
    var endpoint = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/' + longitude + '/lat/' + latitude + '/data.json';
    
    fetch(endpoint)
    // Response from URL fetch (is a JSON in this)
    .then(res => res.json())
    .then(function(json){
        json.timeSeries[0].parameters.find(function(currentParameter){
            if(currentParameter.name === 't'){

                $('.ww-temperature .ww-current-temperature').html(currentParameter.values[0]);
            }
        });
    });
}   

function addTextToImage(p_temp, geoLocation) {
    var bannerElement = $('.main-banner-1 .ratio-wrapper');
    var temperature;
    var geoLocation = 'Current temp';

    if(p_temp){
        temperature = p_temp;
    } else {temperature = 'Too hot'};
    
    // Adds the paragraph to the ened of the ratio-wrapper span tag
    bannerElement.append('<p class="ww-temperature">' + '<span class="ww-current-temperature">' + temperature + '</span>' + '<span class="temperature-scale">°C</span>' + '</p>');
    bannerElement.append('<p class="ww-geo-location">' + geoLocation + '</p>');
    
}

function replaceImage(p_img) {
    var img;
    if(p_img){
        img = p_img;
    }else {
        img = 'sun';
    }
    let imgElement = $('.main-banner-1 .ratio-wrapper').find('img');
    // Changes the source of the image
    imgElement.attr("src","https://slandstedt.github.io/weather-widget/img/" + img +".png"); 
}

function getGeoLocation() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      
      function success(pos) {
        var crd = pos.coords;
       
        updateTempInWidget(crd.longitude, crd.latitude);
        console.log('weather updated with new location');
      }
      
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      
      navigator.geolocation.getCurrentPosition(success, error, options);
};



function init(){
    replaceImage();
    addTextToImage();
    updateTempInWidget();
}

init();