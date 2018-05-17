$(document).ready(()=>{

  var mymap = L.map('mapid').setView([45.5048, -73.5772], 3);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiamF5bDIxNCIsImEiOiJjamhhNjd4bjIwbDRzM2NtZmhoZXhpbndmIn0.j8Nl7tQahZWIPei_CuuO5w'
  }).addTo(mymap);


  var marker1 = L.marker([45.5048, -73.5772]).addTo(mymap);
  var marker2 = L.marker([45.5048, -3.5672]).addTo(mymap);


  marker2.bindPopup("<b>Hello world!</b><br>I am a popup2.")
  marker1.bindPopup("<b>Hello world!</b><br>I am a popup1.")

  mymap.on("zoomend", function(){
    zoomLev = mymap.getZoom();
    console.log(zoomLev)
    // if (zoomLev < 14){
    //   map.removeLayer(lariac);
    //   $('#zoom').val(zoomLev);
    // }else{
    //   $('#zoom').val(zoomLev);
    //   map.addLayer(lariac);
    // }
  });


})