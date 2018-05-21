
$(document).ready(()=>{

  // initialize map with default coords and zoom level
  let mymap = L.map('mapid').setView([45.5048, -73.5772], 3);

  // mapbox tiles
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiamF5bDIxNCIsImEiOiJjamhhNjd4bjIwbDRzM2NtZmhoZXhpbndmIn0.j8Nl7tQahZWIPei_CuuO5w'
  }).addTo(mymap);


  let arrayOfCoords = []


  let popupLayer = []
  let uniquePopupObj = {}

  const urlSplitArr = window.location.href.split("/")  // Returns full URL
  let domain = urlSplitArr[0] + "//" + urlSplitArr[2]  // Protocol and Domain

  $.ajax({
    'url' : domain + '/api/fosterPosts',
    'type' : 'GET',
    'success' : function(data) {
      data.forEach(post=>{

        let coord = [Number(post.latitude), Number(post.longitude)]

        let postId = post.id

        if(!uniquePopupObj[`${coord}`]){
          uniquePopupObj[`${coord}`] = {
                                        "coord" : coord,
                                          "posts" : [{
                                            "postId" : post.id,
                                            "postUrl" : post.postUrl,
                                            "picUrl" : post.picUrl
                                          }]
                                        }
        }else{
          uniquePopupObj[`${coord}`]["posts"].push({
            "postId" : post.id,
            "postUrl" : post.postUrl,
            "picUrl" : post.picUrl
          })
        }

        arrayOfCoords.push(coord)

      })

      console.log(uniquePopupObj)

      for (let key in uniquePopupObj) {
        popupLayer.push(setPopup(uniquePopupObj[key].coord,"popup"))
      }

      // let arrayOfCoords = [[45.5048, -73.5772],[45.5048, -73.2772]]
      let picUrl = 'https://instagram.fymy1-1.fna.fbcdn.net/vp/49bbf0a2000c976e4b660e56df2c045e/5B82C748/t51.2885-15/e35/32178347_421167874995732_2813549512725889024_n.jpg'
      let postUrl = 'https://www.instagram.com/p/Bi7CTHNAAxB/?taken-by=labstruggles'

      // place markers given coordinates
      for (let key in uniquePopupObj){
        placeMarkers(uniquePopupObj[key].coord)
      }

      let popup = `<a href="${postUrl}">\
                    <img class="post" src="${picUrl}">\
                  </a>`

      //toggle popup on zoom level
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

      //place marker
      function placeMarkers(coordSet){
        L.marker(coordSet).addTo(mymap)
      }

      //place stuff
      function setPopup(coordSet, content){
        return L.popup()
                  .setLatLng(coordSet)
                  .setContent(content)
      }

  // ajax close
  }
  });

//document ready
})