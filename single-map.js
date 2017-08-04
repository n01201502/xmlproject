var map;
var geocoder = new google.maps.Geocoder();

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

    function initMap() {

        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 15
        });

        var infoWindow = new google.maps.InfoWindow({map: map});

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
                })
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

function getNearby(){


    var address = document.getElementById('nearLocation').value;

    //alert(nearLocation);
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            getNearbyPlaces(results[0].geometry.location,map);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
    //getNearbyPlaces(pos,map);
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
        console.log(results);
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    }
    function createMarker(place) {
        //console.log(place);
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location

        });
        var contents = "<b>Name: </b>"+place.name+"<br><b>Rating: </b>"+
            place.rating;
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent(contents);
            infoWindow.open(map, this);
        });

    }

}
