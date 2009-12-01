  var geocoder;
  var map;
  var infowindow;
  
      var a = new Array();
    var t =  new Object();
    t.name = "hello 0"
//    t.lat = geoip_latitude() 
//    t.lng = geoip_longitude() 
    a[0] = t;
  
    var t =  new Object();
    t.name = "hello 1"
//    t.lat = geoip_latitude() 
//    t.lng = geoip_longitude() 
    a[1] = t;

    var t =  new Object();
    t.name = "hello 2"
//    t.lat = geoip_latitude() 
//    t.lng = geoip_longitude() 
    a[2] = t;
 
  function initialize() {
    var latlng = new google.maps.LatLng(0, 0);
    var myOptions = {
      zoom: 10,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  }

  function codeAddress(address) {
    initialize();
    geocoder = new google.maps.Geocoder();
    if (geocoder) {
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);

		  var latlng = String(results[0].geometry.location);
		  var lat = latlng.substring(1, latlng.indexOf(","));
		  var lng = latlng.substring(latlng.indexOf(",") + 1, latlng.length - 1);		  
//		  alert("Sie haben Zutritt : " + results[0].geometry.location + "     " +  lat + "  " + lng);
		  
		  markOnMap(lat, lng, a);
    	} else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }
  }
  
  function markOnMap(lat, lng, a){  
	  var latiN = 0;
	  var lngiN = 0;
	  
	  for (var i = 0; i < a.length; i++) {
	
		  var latlng = new google.maps.LatLng(latiN +  parseFloat(lat), lngiN + parseFloat(lng));
		  
		  var marker = new google.maps.Marker({position: latlng, map: map});
			google.maps.event.addListener(marker, "click", function() {
			  if (infowindow) infowindow.close();
			  infowindow = new google.maps.InfoWindow({content: a[i].name});
			  infowindow.open(map, marker);
			});
		
		  // Place markers on map randomly.
		  var randX = Math.random();
		  var randY = Math.random();
		  randX *= (randX * 10) % 2 == 0 ? 1 : -1;
		  randY *= (randY * 10) % 2 == 0 ? 1 : -1;

		  latiN = (randX * 0.01);
		  lngiN = (randY * 0.01);
		  
//		  alert(""+ latiN + "  " + lngiN);
	 }
  }