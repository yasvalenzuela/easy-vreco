//para que el navegador soporte geocolización
/*function findMe(){
    var output = document.getElementById('map');
    if(navigator.geolocation) {
    output.innerHTML = "<p>tu navegador soporta Geocolización</p>";
    }else{
    output.innerHTML = "<p>tu navegador no lo soporta</p>";
    }

// función para obtener latitud y longitud 
function localitation(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var i

    output.innerHTML = "<p>Latitud: "+latitude+" <br/>Logitud:  "+longitude+"</p>"
   }


   function error(){
     output.innerHTML = "<p>No se pudo obtener tu ubicación</p>";
   }
// pasamos como parametro localitation para obtener la ubicación actual
   navigator.geolocation.getCurrentPosition(localitation,error);

}*/
/*
var divMapa = document.getElementById('mapa');
navigator.geolocation.getCurrentPosition(fn_ok, fn_mal);
function fn_mal(){}
function fn_ok(rta){
    var lat = rta.coords.latitude;
    var lon = rta.coords.longitude;

  var  gLatLon =   new google.maps.LatLng(lat,lon);

  // variable para definir las propiedad
  var objConfig =  {
    zoom: 17,
    center:gLatLon
  }

*/
  //crear mapa
  var gMapa = new google.maps.Map(divMapa, objConfig);

function initMap() {
  var uluru = {lat: -33.4724728, lng: -70.9100251};
  var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 17,
  center: uluru
  mapTypeControl: false,
  zoomControl: false,
  streetViewControl:false
});

  var inputOrigen = document.getElementById('origen');
  var autocompleteOrigen = new google.maps.places.Autocomplete(inputOrigen);
  autocompleteOrigen.bindTo('bounds', map);
  var detalleUbicacionOrigen = new google.maps.InfoWindow();
  var markerOrigen = crearMarcador(map);

  crearListener(autocompleteOrigen, detalleUbicacionOrigen, markerOrigen);

  var inputDestino = document.getElementById('destino');
  var autocompleteDestino = new google.maps.places.Autocomplete(inputDestino);
  autocompleteDestino.bindTo('bounds', map);
  var detalleUbicacionDestino = new google.maps.InfoWindow();
  var markerDestino = crearMarcador(map);

  crearListener(autocompleteDestino, detalleUbicacionDestino, markerDestino);

  function crearListener(autocomplete, detalleUbicacion, marker) {
    autocomplete.addListener('place_changed', function() {
    detalleUbicacion.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    marcarUbicacion(place, detalleUbicacion, marker);
    });
  }

 /*
var marker = new google.maps.Marker({
  position: uluru,
  map: map
});
}
*/




/*}*/