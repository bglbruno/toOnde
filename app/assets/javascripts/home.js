$(function(){
    initialize();
    $("#getlocate").on("click", function(e){
        initialize();
    });
});

var map;

function initialize(){
    if (Modernizr.geolocation) {
        navigator.geolocation.getCurrentPosition(showMap, function(){
          handleNoGeolocation(true);
        });
        // para acompanhar
        //navigator.geolocation.watchPosition(showMap, showError);
    } else {
        handleNoGeolocation(false);
    }
}

function showMap(position){

    lat = position.coords.latitude;
    lng = position.coords.longitude;

    $.ajax({
        url: "http://maps.googleapis.com/maps/api/geocode/json",
        contentType: "text/plain",
        dataType: "json",
        data: {latlng: lat +","+ lng, sensor: true}
    }).done(function(response){

        $("#local span").html(response.results[0].formatted_address);

        var location = response.results[0].geometry.location;
        var pos = new google.maps.LatLng(location.lat, location.lng);

        var mapOptions = {
            zoom: 13,
            center: pos
        };

        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        var contentString = '<strong>Você está aqui!</strong><br/>Achamos você :)';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        var marker = new google.maps.Marker({
            position: pos,
            map: map,
            title: 'Você está aqui!'
        });

        map.setCenter(pos);
        infowindow.open(map, marker);
    });
}

function handleNoGeolocation(errorFlag) {

  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}
