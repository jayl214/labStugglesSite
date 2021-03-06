
$(document).ready(()=>{

  // initialize map with default coords and zoom level
  let mymap = L.map('map', {scrollWheelZoom: false} ).setView([45.5048, -73.5772], 3)

  //restrict panning to world map
  const southWest = L.latLng(-89.98155760646617, -180), northEast = L.latLng(89.99346179538875, 180);
  const bounds = L.latLngBounds(southWest, northEast);
  mymap.setMaxBounds(bounds);
  mymap.on('drag', function() {
      mymap.panInsideBounds(bounds, { animate: false });
  });

  // mapbox tiles
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 6,
    minZoom: 2,
    id: 'mapbox.dark',
    accessToken: 'pk.eyJ1IjoiamF5bDIxNCIsImEiOiJjamhhNjd4bjIwbDRzM2NtZmhoZXhpbndmIn0.j8Nl7tQahZWIPei_CuuO5w'
  }).addTo(mymap);

  //initialize popupLayer and popupObj
  //popup is the modal that hovers over a coord, shows the posts originating from those coords
  let popupLayer = [] //array of data that can be fed into leaflet to create popup
  let uniquePopupObj = {} //obj of metadata of each popup, use obj keys to create unique popup for each coord

  const urlSplitArr = window.location.href.split("/")  // Returns full URL
  let domain = urlSplitArr[0] + "//" + urlSplitArr[2]  // Protocol and Domain

  //ajax get req to api
  $.ajax({
    'url' : domain + '/api/fosterPosts',
    'type' : 'GET',
    'success' : function(data) {
      data.forEach(post=>{

        //structure lat long data into coord array
        let coord = [Number(post.latitude), Number(post.longitude)]

        if(!uniquePopupObj[`${coord}`]){ //if the coord is new, create a new entry for it in popupObj
          uniquePopupObj[`${coord}`] = {
                                        "coord" : coord,
                                        "posts" : [{
                                          "postId" : post.id,
                                          "postUrl" : post.postUrl,
                                          "picUrl" : post.picUrl
                                        }],
                                        "singleOrManyPost" : "single-post",
                                        "popup" : `
                                                    <div class="container">
                                                      <div class="row">
                                                        <div class="col">

                                                          <a href="${post.postUrl}" target="_blank">
                                                            <img class="post" src="${post.picUrl}">
                                                          </a>

                                                        </div>
                                                  `,
                                        }
        }else{ //if the coords already exist, append data of new post to existing obj
          let existingPopup = uniquePopupObj[`${coord}`]

          // existingPopup.singleOrManyPost = "many-post"

          existingPopup["posts"].push({
            "postId" : post.id,
            "postUrl" : post.postUrl,
            "picUrl" : post.picUrl,
          })

          let newPost = `<div class="col">
                          <a href="${post.postUrl}" target="_blank">
                            <img class="post" src="${post.picUrl}">
                          </a>
                        </div>`

          existingPopup["popup"] = existingPopup["popup"] + newPost
        }

      })

      for (let key in uniquePopupObj) {
        //close post-container, container, and row divs for each popup
        uniquePopupObj[key].popup = `<div class="post-container ${uniquePopupObj[key].singleOrManyPost}">` +
                                          uniquePopupObj[key].popup+
                                        `</div>
                                      </div>
                                    </div>`

        //push leaflet-ready data to popupLayer array
        // popupLayer.push(setPopup(uniquePopupObj[key].coord,uniquePopupObj[key].popup))
      }

      // place markers at locations of popups
      for (let key in uniquePopupObj){
        let marker = placeMarkers(uniquePopupObj[key].coord)
        marker.bindPopup(setPopup(uniquePopupObj[key].popup), {closeOnClick: false, autoClose: true}).openPopup()
      }

    } // ajax req success close
  }) //ajax close

  //place marker at coord
  function placeMarkers(coordSet){
    return L.marker(coordSet, {riseOnHover:true}).addTo(mymap)
  }

  //place popup containing html at coord
  function setPopup(content){
    return L.popup().setContent(content)
  }

//document ready
})