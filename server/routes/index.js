const fosterPostsController = require('../controllers').fosterPosts;
const http = require('http');
var request = require('request');



module.exports = (app) => {

  //home
  app.get('/', (req, res) => {
    res.render('pages/home')
  });

  app.get('/foster',(req, res) => {
    //send template var pathname to for navbar highlight
    res.render('pages/foster', {"pathname": "foster"})
  });

  app.get('/comics',(req, res) => {

    request(`http://api.instagram.com/v1/users/self/media/recent/?access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      let bodyData = JSON.parse(body).data

      res.render('pages/comics', {"pathname": "comics", "instaData": bodyData})
    });
  });

  app.get('/about',(req, res) => {
    res.render('pages/about', {"pathname": "about"})
  });

  // app.get('/login',(req, res) => {
  //   res.render('pages/login')
  // });

  //API ROUTES
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the LabStruggles API!',
  }));

  //foster posts
  app.post('/api/fosterPosts/'+process.env.POST_REQ_SECRET, fosterPostsController.create);
  app.get('/api/fosterPosts', fosterPostsController.list);

};