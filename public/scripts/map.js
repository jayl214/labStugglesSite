
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


  // let arrayOfCoords = []


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
                                          }],
                                          "popup" : `
                                                    <div class="post-container">
                                                    <div class="container">
                                                      <div class="row">

                                                        <div class="col">
                                                          <a href="#">
                                                            <img class="post" src="${post.picUrl}">
                                                          </a>
                                                        </div>
                                                    `
                                        }
        }else{
          uniquePopupObj[`${coord}`]["posts"].push({
            "postId" : post.id,
            "postUrl" : post.postUrl,
            "picUrl" : post.picUrl
          })
          uniquePopupObj[`${coord}`]["popup"] = uniquePopupObj[`${coord}`]["popup"] + `<div class="col">
                                                          <a href="#">
                                                            <img class="post" src="${post.picUrl}">
                                                          </a>
                                                        </div>`
        }

      })

      for (let key in uniquePopupObj) {
        uniquePopupObj[key].popup+"</div></div></div>"
        popupLayer.push(setPopup(uniquePopupObj[key].coord,uniquePopupObj[key].popup))
      }

      // place markers given coordinates
      for (let key in uniquePopupObj){
        placeMarkers(uniquePopupObj[key].coord)
      }


      //toggle popup on zoom level
      mymap.on("zoomend", function(){
        zoomLev = mymap.getZoom();
        console.log(zoomLev)
        if (zoomLev > 3){
          popupLayer.forEach((popup)=>{
            mymap.addLayer(popup)
          })
        }else if(zoomLev < 4){
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