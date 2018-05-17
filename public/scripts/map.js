$(document).ready(()=>{

  var mymap = L.map('mapid').setView([45.5048, -73.5772], 3);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiamF5bDIxNCIsImEiOiJjamhhNjd4bjIwbDRzM2NtZmhoZXhpbndmIn0.j8Nl7tQahZWIPei_CuuO5w'
  }).addTo(mymap);


  var marker1 = L.marker([45.5048, -73.5772]).addTo(mymap);
  var marker2 = L.marker([45.5048, -73.2772]).addTo(mymap);

  // marker1.bindPopup("<b>Hello world!</b><br>I am a popup1.")
  // marker2.bindPopup("<b>Hello world!</b><br>I am a popup2.")

  // function instaPopup(coordArray, content){

  // }

  var popupLayer = [
    L.popup()
      .setLatLng([45.5048, -73.5772])
      .setContent('<h1>popup1<h1>'),
    L.popup()
      .setLatLng([45.5048, -73.2772])
      .setContent("popup2")
  ]



  // var popup1 = L.popup()
  //   .setLatLng([45.5048, -73.5772])
  //   .setContent("I am a standalone popup.")
  //   // .openOn(mymap);

  // var popup2 = L.popup()
  //   .setLatLng([45.5048, -73.2772])
  //   .setContent("I am a standalone popup.")
  //   // .openOn(mymap);

  // mymap.addLayer(popup1).addLayer(popup2);


  mymap.on("zoomend", function(){
    zoomLev = mymap.getZoom();
    console.log(zoomLev)
    if (zoomLev > 5){
      popupLayer.forEach((popup)=>{
        mymap.addLayer(popup)
      })
    }else if(zoomLev < 6){
      popupLayer.forEach((popup)=>{
        mymap.removeLayer(popup)
      })
    }
  });


})