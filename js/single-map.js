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

        var map = new google.maps.Map(document.getElementById('map'), {
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

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);

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
