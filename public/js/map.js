var mapa = L.map('mapid').setView([43.3073225, -1.9914354], 13);
mapa.addEventListener('moveend', function(ev) {
	if (document.getElementById("error_zoom")) {
	   var centro=mapa.getCenter();
	   var zoom=mapa.getZoom();
	   if(zoom<12){
	   		limpiarMapaAseos();
	   		document.getElementById('error_zoom').style.display='block';
	   }else{
	   		getAseos(centro.lat,centro.lng);
	   		document.getElementById('error_zoom').style.display='none';
	   }
	   //lat = ev.latlng.lat;
	   //lng = ev.latlng.lng;
	   console.log(centro, zoom);
	}
});

var baselayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets',
	}).addTo(mapa);

var toplayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets-satellite',
	});

	var layers = {
		'Basico': baselayer,
		'Satelite': toplayer
	};

	L.control.layers(layers).addTo(mapa);


// 	$('#geolocate').on('click', function(){
//   mapa.locate({setView: true, maxZoom: 15});
// });

	// create the geocoding control and add it to the map
	 var searchControl = L.esri.Geocoding.geosearch({
  	useMapBounds:false,																			//quitar filtración de mapa
  	providers: [ L.esri.Geocoding.arcgisOnlineProvider() ] //de donde pilla la data
	}).addTo(mapa);

	 // create an empty layer group to store the results and add it to the map
	 var results = L.layerGroup().addTo(mapa);

	 // listen for the results event and add every result to the map
	 searchControl.on("results", function(data) {
			 results.clearLayers();
			 for (var i = data.results.length - 1; i >= 0; i--) {
					 results.addLayer(L.marker(data.results[i].latlng));
					 getAseos(data.results[i].latlng.lat,data.results[i].latlng.lng);
			 }
	 });



// function onLocationFound(e) {
//     var radius = e.accuracy / 5;
//     L.marker(e.latlng).addTo(mapa)
//         .on('click', function(){
//           confirm("are you sure?");
//         });
//     L.circle(e.latlng, radius).addTo(mapa);
// }
//
// mapa.on('locationfound', onLocationFound);
//
// function onLocationError(e) {
//     alert(e.message);
// }
// mapa.on('locationerror', onLocationError);
var aseos=[];

var aseoIcon = L.icon({
    iconUrl: '/img/marker.png',

    iconSize:     [25, 35], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 35], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

function getAseos(x,y){
	limpiarMapaAseos();
	var loc={latitud: x, longitud: y}
	$.get( "/api/mapa/getAseos/", loc, function( data ) {
		for (var i=0;i<data.length;i++){
			var marker=L.marker([data[i].latitud, data[i].longitud],{icon:aseoIcon}).on('click',markerOnClick).addTo(mapa);
			marker.aseo=data[i].id;
			aseos.push(marker);
		}
	});
}

function getAseos2(x,y){
	limpiarMapaAseos();
	setVista(x,y);
	var loc={latitud: x, longitud: y}
	$.get( "/api/mapa/getAseos/", loc, function( data ) {
		for (var i=0;i<data.length;i++){
			var marker=L.marker([data[i].latitud, data[i].longitud],{icon:aseoIcon}).on('click',markerOnClick).addTo(mapa);
			marker.aseo=data[i].id;
			aseos.push(marker);
		}
	});
}

function limpiarMapaAseos(){
	for (var i=0;i<aseos.length;i++){
		mapa.removeLayer(aseos[i]);
	}
}

function limpiarMapa(){
	for (var i=0;i<aseos.length;i++){
		mapa.removeLayer(aseos[i]);
	}
	results.clearLayers();
}

function markerOnClick(e){
		var mapaSection = document.getElementById('section');
    var aside = document.getElementById('aside');
    mapaSection.classList.remove('col-md-12');
    mapaSection.classList.add('col-md-9');
    aside.hidden = false;
	setVista(e.latlng.lat,e.latlng.lng);
	var aseo={id: e.target.aseo};
 	$.get( "/api/mapa/getAseo/"+ e.target.aseo, function( data ) {
		cambiarInfoFicha(data);
	});
	getComentarios(e.target.aseo);
}
function setVista(x,y){
	mapa.setView([x, y],16);
}

function cambiarInfoFicha(data){
	console.log(data.foto);
	if(data.foto == 'wc.jpg'){
		document.getElementById("imgWC").src = "/img/"+data.foto;
	}else{
		document.getElementById("imgWC").src=data.foto; //link de la foto
	}
	document.getElementById("nombre").innerHTML=data.nombre;
	document.getElementById("dir").innerHTML=data.dir;
	document.getElementById("horario").innerHTML=data.horas24 == 1?"24 horas":data.horarioApertura+"-"+data.horarioCierre;
	document.getElementById("precio").innerHTML=data.precio==null?"GRATIS": data.precio+" €";
	document.getElementById("accesible").innerHTML=data.accesibilidad==1?"Accesible":"No accesible";
	document.getElementById("aseoComentario").value=data.id;
}

function getComentarios(idAseo){

 	$.get( "/api/comentarios/"+idAseo , function( data ) {
 		var comentarios="";
 		if (data.length==0){
			comentarios="<i>No hay comentarios</i>";
		}else{
			for(var i=0;i<data.length;i++){
				comentarios+='<div class="card comentario">'+
      				'<div class="card-body">'+
				          '<div class="row">'+
				              '<div class="col-md-12">'+
				                  '<p>'+
				                      '<a class="float-left" href="/usuario/p/'+data[i].user_id+'"><strong>'+data[i].usuario.name+'</strong> - '+data[i].created_at+'</a>'+
				                      '<span class="float-right"><i class="text-warning fa fa-star"></i></span>'+
				                      '<span class="float-right"><i class="text-warning fa fa-star"></i></span>'+
				                      '<span class="float-right"><i class="text-warning fa fa-star"></i></span>'+
				                      '<span class="float-right"><i class="text-warning fa fa-star"></i></span>'+

				                 '</p>'+
				                 '<div class="clearfix"></div>'+
				                  '<p>'+data[i].text+'</p>'+
				                  '<p>'+
				                      '<a onclick="votar('+data[i].id+',false)" class="float-right btn btn-outline-danger ml-2">'+data[i].dislike+' <i class="fa fa-thumbs-down"></i></a>'+
				                      '<a onclick="votar('+data[i].id+',true)" class="float-right btn btn-outline-primary ml-2">'+data[i].like+' <i class="fa fa-thumbs-up"></i></a>'+
				                      '<a onclick="deleteComentario('+data[i].id+')" class="float-right btn btn-outline-secondary"> <i class="fa fa-trash-alt"></i></a>'+
				                 '</p>'+
				              '</div>'+
				          '</div>'+
				      '</div>'+
				  '</div>';
			}
		}
		document.getElementById("comentarios").innerHTML=comentarios;
		
	});
}

function enviarComentario(e){
	e.preventDefault();
	var aseo=document.getElementById("aseoComentario").value;
	var usuario=document.getElementById("userComentario").value;
	var text=document.getElementById("textComentario").value;
	var data={ aseoId:aseo, userId:usuario, text:text};
	$.post( "/api/comentarios/", data, function( data ) {
		getComentarios(aseo);
		document.getElementById("textComentario").value="";
	});
	return false;
}

function deleteComentario(id){
	$.ajax({
	    url: '/api/comentarios/'+id,
	    type: 'DELETE',
	    success: function(result) {
	    	var aseo=document.getElementById("aseoComentario").value;
	        getComentarios(aseo);
	    }
	});
}

function votar(coment,bool){
	var usuario=document.getElementById("userComentario").value;
	var data={ userId:usuario, voto:bool};
	$.post( "/api/comentarios/"+coment+"/valorar", data, function( data ) {
		var aseo=document.getElementById("aseoComentario").value;
	    getComentarios(aseo);;
	});
}

