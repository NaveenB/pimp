  var geocoder;
  var map;
  var infowindow;
  
  (function () {

	  google.maps.Map.prototype.markers = new Array();
		
	  google.maps.Map.prototype.addMarker = function(marker) {
		this.markers[this.markers.length] = marker;
	  };
		
	  google.maps.Map.prototype.getMarkers = function() {
		return this.markers
	  };
    
  })();
 
  function initialize() {
    var latlng = new google.maps.LatLng(0, 0);
    var myOptions = {
      zoom: 14,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  }

  function codeAddress(address, a) {
    initialize();
    geocoder = new google.maps.Geocoder();
    if (geocoder) {
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);

		  var latlng = String(results[0].geometry.location);
		  var lat = latlng.substring(1, latlng.indexOf(","));
		  var lng = latlng.substring(latlng.indexOf(",") + 1, latlng.length - 1);		  		  
		  markOnMap(lat, lng, a);
		  console.log(map.getMarkers());    
    	} else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }
	
	return a;
  }
  
  function markOnMap(lat, lng, a){  
	  var latiN = 0;
	  var lngiN = 0;
	  var latlng;
	  
	  for (var i = 0; i < a.length; i++) {
		  if(a[i].lat == 0 || a[i].lng == 0 ){

			  // Generate markers for map randomly.
			  var randX = Math.random();
			  var randY = Math.random();
			  randX *= (randX * 10) % 2 == 0 ? 1 : -1;
			  randY *= (randY * 10) % 2 == 0 ? 1 : -1;

			  latiN = (randX * 0.005) + parseFloat(lat);
			  lngiN = (randY * 0.005) + parseFloat(lng);		  
			  
			  a[i].lat = latiN  
			  a[i].lng = lngiN 

			  latlng = new google.maps.LatLng(latiN, lngiN);
		  } else {
			latlng = new google.maps.LatLng(a[i].lat, a[i].lng);
		  }
		  
		  var marker = new google.maps.Marker({position: latlng, map: map});
			google.maps.event.addListener(marker, "click", function() {
			  if (infowindow) infowindow.close();
			  infowindow = new google.maps.InfoWindow({content: String(a[i].name)});
			  infowindow.open(map, marker);
			});			
    	  map.addMarker(marker);
	 }
 }