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
	  
	  for (var i = 0; i < a.length; i++) {
	
		  var latlng = new google.maps.LatLng(latiN +  parseFloat(lat), lngiN + parseFloat(lng));
		  
		  var marker = new google.maps.Marker({position: latlng, map: map});
			google.maps.event.addListener(marker, "click", function() {
			  if (infowindow) infowindow.close();
			  infowindow = new google.maps.InfoWindow({content: String(a[i].name)});
			  infowindow.open(map, marker);
			});
		
		  a[i].latlng = latlng;

    	  map.addMarker(marker);

		  // Generate markers for map randomly.
		  var randX = Math.random();
		  var randY = Math.random();
		  randX *= (randX * 10) % 2 == 0 ? 1 : -1;
		  randY *= (randY * 10) % 2 == 0 ? 1 : -1;

		  latiN = (randX * 0.005);
		  lngiN = (randY * 0.005);		  
	 }
 }