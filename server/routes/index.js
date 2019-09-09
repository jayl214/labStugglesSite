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
    res.render('pages/comics', {"pathname": "comics", "comics": [
      {
        label: "disappointed",
        route: "docs/images/comics/disappointed.png",
        link: "https://www.instagram.com/p/BvhHgRLhomg/",
      },
      {
        label: "factoid",
        route: "docs/images/comics/factoid.png",
        link: "https://www.instagram.com/p/BtjAR9GBn4n/",
      },
      {
        label: "profonprofhate",
        route: "docs/images/comics/profonprofhate.png",
        link: "https://www.instagram.com/p/BvweB8yBFrH/",
      },
      {
        label: "studentnumber3",
        route: "docs/images/comics/studentnumber3.png",
        link: "https://www.instagram.com/p/B0OVoAwh80-/",
      },
    ]})
  });

  app.get('/about',(req, res) => {
    res.render('pages/about', {"pathname": "about"})
  });

  //API ROUTES
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the LabStruggles API!',
  }));

  //foster posts
  app.post('/api/fosterPosts/'+process.env.POST_REQ_SECRET, fosterPostsController.create);
  app.get('/api/fosterPosts', fosterPostsController.list);

};