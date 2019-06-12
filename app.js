init();

function init(){
    replaceImage();
    addTextToImage();
    getGeoLocation();
}

// Byter ut bilden på hemsidan
function replaceImage() {
    let imgElement = $('.main-banner-1 .ratio-wrapper img');
    imgElement.attr("src","https://slandstedt.github.io/weather-widget/img/sun.png"); 
}

// 
function addTextToImage(p_temp) {
    var bannerElement = $('.main-banner-1 .ratio-wrapper');
    var temperature;

    if(p_temp){
        temperature = p_temp;
    } else {temperature = 'xxx'};
    
    // Adds the paragraph to the ened of the ratio-wrapper span tag
    bannerElement.append('<p class="ww-temperature">' + '<span class="ww-current-temperature">' + temperature + '</span>' + '<span class="temperature-scale">°C</span>' + '</p>');
    bannerElement.append('<p class="ww-geo-location">Current temperatore</p>');
}

function getGeoLocation() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      
      function success(pos) {
        var crd = pos.coords;
       
        updateTempInWidget(crd.latitude, crd.longitude);
        console.log('weather updated with new location');
      }
      
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      
      navigator.geolocation.getCurrentPosition(success, error, options);
};

function updateTempInWidget(p_latitude, p_longitude){
    var endpoint;

    if(p_latitude && p_longitude){
        endpoint = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/' + p_longitude.toFixed(4) + '/lat/' + p_latitude.toFixed(4) + '/data.json';
    } else {
        endpoint = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/22.1567/lat/65.5848/data.json';
    }
    
    fetch(endpoint)
    .then(res => res.json())
    .then(function(json){
        json.timeSeries[0].parameters.find(function(currentParameter){
            if(currentParameter.name === 't'){
                $('.ww-temperature .ww-current-temperature').html(currentParameter.values[0]);
            }
        });
    });

}   





