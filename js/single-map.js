var map;
var markers = [];
$(document).ready(function(){
    'use strict';
    var mapStyles = [{
        'elementType': 'geometry',
        'stylers': [{
            'color': '#f5f5f5'
        }]
    },
        {
            'elementType': 'labels.icon',
            'stylers': [{
                'visibility': 'off'
            }]
        },
        {
            'elementType': 'labels.text.fill',
            'stylers': [{
                'color': '#616161'
            }]
        },
        {
            'elementType': 'labels.text.stroke',
            'stylers': [{
                'color': '#f5f5f5'
            }]
        },
        {
            'featureType': 'administrative.land_parcel',
            'elementType': 'labels.text.fill',
            'stylers': [{
                'color': '#bdbdbd'
            }]
        },
        {
            'featureType': 'poi',
            'elementType': 'geometry',
            'stylers': [{
                'color': '#eeeeee'
            }]
        },
        {
            'featureType': 'poi',
            'elementType': 'labels.text.fill',
            'stylers': [{
                'color': '#757575'
            }]
        },
        {
            'featureType': 'poi.park',
            'elementType': 'geometry',
            'stylers': [{
                'color': '#e5e5e5'
            }]
        },
        {
            'featureType': 'poi.park',
            'elementType': 'labels.text.fill',
            'stylers': [{
                'color': '#9e9e9e'
            }]
        },
        {
            'featureType': 'road',
            'elementType': 'geometry',
            'stylers': [{
                'color': '#ffffff'
            }]
        },
        {
            'featureType': 'road.arterial',
            'elementType': 'labels.text.fill',
            'stylers': [{
                'color': '#757575'
            }]
        },
        {
            'featureType': 'road.highway',
            'elementType': 'geometry',
            'stylers': [{
                'color': '#dadada'
            }]
        },
        {
            'featureType': 'road.highway',
            'elementType': 'labels.text.fill',
            'stylers': [{
                'color': '#616161'
            }]
        },
        {
            'featureType': 'road.local',
            'elementType': 'labels.text.fill',
            'stylers': [{
                'color': '#9e9e9e'
            }]
        },
        {
            'featureType': 'transit.line',
            'elementType': 'geometry',
            'stylers': [{
                'color': '#e5e5e5'
            }]
        },
        {
            'featureType': 'transit.station',
            'elementType': 'geometry',
            'stylers': [{
                'color': '#eeeeee'
            }]
        },
        {
            'featureType': 'water',
            'elementType': 'geometry',
            'stylers': [{
                'color': '#c9c9c9'
            }]
        },
        {
            'featureType': 'water',
            'elementType': 'labels.text.fill',
            'stylers': [{
                'color': '#9e9e9e'
            }]
        }
    ];

    var myEl = document.getElementById('nearLocation');

    myEl.addEventListener('keypress', function() {
        if(event.keyCode == 13){
            var geocoder = new google.maps.Geocoder();
            geocodeAddress(geocoder, map);
            return false;
        }


    });

    function initMap() {

        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 15
        });

        //var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                //infoWindow.setPosition(pos);
                //infoWindow.setContent('You are here!');
                var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
                var marker = new google.maps.Marker({
                    position: pos,
                    title: 'You are here!',
                    map: map,
                    icon: image
                });
                markers.push(marker);
                map.setCenter(pos);
                getNearbyPlaces(pos,map);
            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    }


    var infoWindow = new google.maps.InfoWindow({map: map});

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    }

    var id = document.getElementById('map');
    if (id) {
        initMap();
    }
});

function geocodeAddress() {
    deleteMarkers();
    var geocoder = new google.maps.Geocoder();
    var address = document.getElementById('nearLocation').value;
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            markers.push(marker);
            getNearbyPlaces(results[0].geometry.location,map);
            return false;
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }

    });
}

function getNearbyPlaces(location,map) {
    var request = {
        location : location,
        radius: 1000,
        type: ['restaurant']
    };
    infoWindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request,callback);
    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
                listRestaurants(results[i]);
                //getRatingStars(results[i]);
            }
        }

        $("#restaurantCount").append(results.length)

    }

    function listRestaurants(place) {

        $("#restaurantList").append(
            "<div class='listContent'>" +
                "<div class='row'>" +
                    "<div class='col-sm-7 col-xs-12'>" +
                        "<div class='categoryDetails'>" +
                            /*"<ul class='list-inline rating'>" +
                                "<li id='starDrawing'></li>" +
                                "<li><i class='fa fa-star-o' aria-hidden='true'></i></li>" +
                                "<li><i class='fa fa-star' aria-hidden='true'></i></li>" +
                                "<li><i class='fa fa-star-half-empty' aria-hidden='true'></i></li>" +
                                "<li><i class='fa fa-star' aria-hidden='true'></i></li>" +
                                "<li><i class='fa fa-star' aria-hidden='true'></i></li>" +
                            "</ul>" +*/
                            "<h2><a href='details.html' style='color: #222222'>" + place.name + "</a> </h2>" +
                            "<p>" + place.vicinity + "</p>" +
                            "<p><b>Rating: </b>" + place.rating + "</p>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
            "</div>"
        )

    }
    
    function paginationList() {

    }

    /*function getRatingStars(place) {

        var restRating = place.rating;
        var starCSS = "";
        starBefore = restRating.toString().split(".")[0];

        for (var j = 0; j < starBefore; j++) {
            starCSS += "<i class='fa fa-star' aria-hidden='true'></i>";
        }

        document.getElementById('starDrawing').innerHTML = starCSS;

    }*/

    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location

        });
        markers.push(marker);
        var contents = "<b>Name: </b>"+place.name+"<br><b>Rating: </b>"+
            place.rating;
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent(contents);
            infoWindow.open(map, this);
        });

    }

}
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}
function deleteMarkers() {
    clearMarkers();
    markers = [];
}
function clearMarkers() {
    setMapOnAll(null);
}

var myItem = document.getElementById('findItem');

myItem.addEventListener('keypress', function() {
    if(event.keyCode == 13){
        var geocoder = new google.maps.Geocoder();
        restName(geocoder, map);
        return false;
    }


});

function restName() {
    deleteMarkers();
    var geocoder = new google.maps.Geocoder();
    var address = document.getElementById('findItem').value;
    geocoder.geocode({'address': address}, function(results, status) {

        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            var placeiD = results[0].place_id;
            var service = new google.maps.places.PlacesService(map);
            var infoWindow = new google.maps.InfoWindow({map: map});
            service.getDetails({
                placeId: placeiD
            }, function(place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    var marker = new google.maps.Marker({
                        map: map,
                        position: place.geometry.location
                    });
                    var contents = "<b>Name: </b>"+place.name+"<br><b>Phone Number: </b>"+
                        place.formatted_phone_number+"<br><b>Rating: </b>"+
                        place.rating;
                    google.maps.event.addListener(marker, 'click', function() {
                        infoWindow.setContent(contents);
                        infoWindow.open(map, this);
                    });
                }
            });
            return false;
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }

    });
}


/*
$("#address").keyup(function(event){
    if(event.keyCode == 13){
        $("#nearbyHidden").click();
    }
});*/
