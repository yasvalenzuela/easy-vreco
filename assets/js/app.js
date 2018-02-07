function initMap() {
// con esto aparece el mapa
  var coordenadas = {lat: -33.416946, lng: -70.639477};
  var map = new google.maps.Map(document.getElementById('mapa'), {
  zoom: 17,
  center: coordenadas,
  mapTypeControl: false,
  zoomControl: false,
  streetViewControl: false
  });

  var markCoordenadas = new google.maps.Marker({
    position: coordenadas,
    map: map
  });

// se crea el evento de click, cuando haga click en encuentrame se ejecutara la funcion
  var infoWindow = new google.maps.InfoWindow({map: map});
  var btnEncuentrame = document.getElementById('btnEncuentrame');
  btnEncuentrame.addEventListener('click', findMe);

// funcion para mostrar mi ubicacion actual
  function findMe() {
    if(navigator.geolocation){
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
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }

// con esto se realiza el autocompletado en los input
  var origen = document.getElementById('origen');
  var destino = document.getElementById('destino');

  new google.maps.places.Autocomplete(origen);
  new google.maps.places.Autocomplete(destino);

// marca la ruta aun no funciona
  var btnRuta = document.getElementById('btnRuta');
  btnRuta.addEventListener('click', routes);
  
  function routes(ds, dr) {
    var origen = document.getElementById('origen').value;
  var destino = document.getElementById('destino').value;
    if(origen !== "" || destino !== "") {
      ds.route({
        origin: origen,
        destination: destino,
        travelMode: "DRIVING"
      },
      function(response, status) {
        if (status === "OK") {
          dr.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      })
    }
  }
  dr.setMap(map);
   var trazarRuta = function(){
      calcularRuta(ds,dr);
  };
}



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
navigator.geolocation.getCurrentPosition(fn_ok, fn_mal);//obtiene la localización del usuario, todo lo que pasa si esta bien o mal
function fn_mal(){}// función cuando la ubicación es incorrecta se le puedeagregar un alert
function fn_ok(rta){// función obtiene la ubicación correcta
    var lat = rta.coords.latitude;//latitud del usuario
    var lon = rta.coords.longitude;// logitud del usuario

  var  gLatLon =   new google.maps.LatLng(lat,lon);// se convierte la latitud y longitud en un objeto de google

  // variable para definir las propiedad
  var objConfig =  {
    zoom: 17,
    center:gLatLon
  }
*/

/*
<<<<<<< HEAD
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

/*esto es lo de la gaby
var divMapa = document.getElementById('mapa');
navigator.geolocation.getCurrentPosition(fn_ok, fn_mal);//obtiene la localización del usuario, todo lo que pasa si esta bien o mal
function fn_mal(){}// función cuando la ubicación es incorrecta se le puedeagregar un alert
function fn_ok(rta){// función obtiene la ubicación correcta
    var lat = rta.coords.latitude;//latitud del usuario
    var lon = rta.coords.longitude;// logitud del usuario

  var  gLatLon =   new google.maps.LatLng(lat,lon);// se convierte la latitud y longitud en un objeto de google

  // variable para definir las propiedad
  var objConfig =  {
    zoom: 17,
    center:gLatLon
  }

  //crear mapa
  var gMapa = new google.maps.Map(divMapa, objConfig);
  var objConfigMarker = {
    position: gLatLon,
    animation:google.maps.Animation.DROP,
    map: gMapa,
    draggable:true,
    title: "Usted esta aquí"
  }
  var gMarker = new google.maps.Marker(objConfigMarker);
      gMarker.setIcon('usuario.png')


  var gCoder = new google.maps.Geocoder();//traduce un domicilio a una coordenada
  var objInformacion = {
      address: 'Av. Salvador Allende 143 Santiago San Joaquin Región Metropolitana, Chile'
  }
    gCoder.geocode( objInformacion, fn_coder);//obtiene la información y responde

    function fn_coder(datos){
       var coordenadas = datos[0].geometry.location;//objeto latitud longitud de google
       var config = {
        map:gMapa,
        position:coordenadas,
        animation:google.maps.Animation.DROP,
        title:'ubicación casa'
       
       }

     
     var gMarkerDV = new google.maps.Marker(config)
     gMarkerDV.setIcon('edificio.png')
/* 11a7381b641cb61e799a2501e9bbf884bc83db40*/
/*tambien es lo de la gaby
    var objHTML={
      content: '<div style="height:150px; width:300px"><h2>Escuela</h2></div>'
    }

     var gIW = new google.maps.InfoWindow(objHTML);
     google.maps.event.addListener(gMarkerDV,'click',

      function(){
      
          gIW.open(gMapa,gMarkerDV);
     });
  }

  var objConfigDR = {
    map: gMapa //en que mapa se renderiza
    //suppresMarkers:true

  }

  var objConfigDS = {
    origin: gLatLon,//punto de origen latitud o longitud o el string del domicilio
    destination: objInformacion.address, //punto destino  tomamos la dirección del objeto información
    travelMode: google.maps.TravelMode.DRIVING//la forma en la que quiero llegar del punto a al punto b
    //WALKING - TRANSIT-BICYCLING
  }

 var ds = new google.maps.DirectionsService();//Obtener coordenadas
 var dr = new google.maps.DirectionsRenderer(objConfigDR);//Traduce las coordenadas a la ruta visible

 ds.route(objConfigDS, fnRutear);// recibe dos datos la configuración del ruteo muestra la linea entre a y b

 function fnRutear(resultados,status){// resultados y estatus si salio todo bien y la ruta google la pudo computar
  // mostrar la linea entre a y b
  if (status == 'OK'){
    dr.setDirections(resultados);
     }else{
      alert('Error'+status);
     }

  }

}*/



/*
// trazar ruta
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
    directionsService.route({
      origin: origen.value,
      destination: destino.value,
      travelMode: 'DRIVING'
    }, function(response, status) {
        if(status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('No encontramos una ruta');
        }
      }
    })
  }

  directionsDisplay.setMap(map);
  var trazarRuta = function(){
    calculateAndDisplayRoute(directionsService, directionsService);
  }
  document.getElementById('btnRuta').addEventListener('click', trazarRuta);
  */


