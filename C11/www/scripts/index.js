(function () {
var latlng, myPosition;
var map;
var allMarkers = [];

    $(document).ready(function () {
        if (navigator.geolocation !== null) {
            $("#mapMyHome").height(screen.height - 300);
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }
        else {
            alert("navigator.geolocation == null");
        }

        $("#btnWhere").bind("click", function () {
            whereami();
        });

        $("#btnGo").bind("click", function () {
            findmyplace();
        });

        $("#btnCafe").bind("click", function () {
            findmyplacetype("cafe");
        });

        $("#btnStore").bind("click", function () {
            findmyplacetype("store");
        });

        $("#btnLibrary").bind("click", function () {
            findmyplacetype("library");
        });
    });

    function findmyplacetype(placetype) {
        var request = {
            location: latlng,
            radius: '500',
            type: [placetype]
        };

        var service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
    }

    function findmyplace() {
        var request = {
            location: latlng,
            radius: '500',
            query: $("#txtPlace").val()
        };
        var service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
    }

    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                createMarker(results[i]);
            }
        }
    }

    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ABC',
            position: place.geometry.location,
            animation: google.maps.Animation.DROP
        });
        allMarkers.push(marker);

        infowindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
    }

    function whereami() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        detailedGPS(myPosition);
    }

    function detailedGPS(position) {
        validationMsgs('Latitude: ' + position.coords.latitude + '\n' +
            'Longitude: ' + position.coords.longitude + '\n' +
            'Altitude: ' + position.coords.altitude + '\n' +
            'Accuracy: ' + position.coords.accuracy + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
            'Heading: ' + position.coords.heading + '\n' +
            'Speed: ' + position.coords.speed + '\n' +
            'Timestamp: ' + position.timestamp + '\n', "Here you are", "OK");
        }

    function onSuccess(position) {
        myPosition = position;
        drawMap(position.coords.latitude, position.coords.longitude);
    }

    function onError(error) {
        console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }

    function drawMap(currentLatitude, currentLongtitude) {
        //Creates a new google maps object
        latlng = new google.maps.LatLng(currentLatitude, currentLongtitude);
        var mapOptions = {
            center: latlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.LEFT_TOP
            }
        };

        var myLatLng = { lat: currentLatitude, lng: currentLongtitude };

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: latlng,
            title: 'Hello World!'
        });

        map = new google.maps.Map($("#mapMyHome").get(0), mapOptions);
        marker.setMap(map);
    }

})();