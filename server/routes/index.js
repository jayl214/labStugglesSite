const fosterPostsController = require('../controllers').fosterPosts;
const http = require('http');

module.exports = (app) => {

  //home
  app.get('/', (req, res) => {
    res.render('pages/home')
  });

  app.get('/map',(req, res) => {
    http.get(req.protocol + '://' + req.get('host')+'/api/fosterPosts', (dbRes)=>{
      var body = '';
      dbRes.on('data', function(chunk){
          body += chunk;
      })
      dbRes.on('end', function(){
          let fosterPostsList = JSON.parse(body)
          let templateVars = {"templateVars": fosterPostsList}
          res.render('pages/map', templateVars)
      })
    }).on('error', e => {
      console.log('error')
    })
  });

  app.get('/comics',(req, res) => {
    res.render('pages/comics')
  });

  app.get('/login',(req, res) => {
    res.render('pages/login')
  });

  //API ROUTES
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the LabStruggles API!',
  }));

  //foster posts
  app.post('/api/fosterPosts', fosterPostsController.create);
  app.get('/api/fosterPosts', fosterPostsController.list);

};