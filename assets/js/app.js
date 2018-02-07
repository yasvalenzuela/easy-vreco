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

}