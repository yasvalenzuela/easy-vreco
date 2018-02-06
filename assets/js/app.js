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

  //crear mapa
  var gMapa = new google.maps.Map(divMapa, objConfig);





}