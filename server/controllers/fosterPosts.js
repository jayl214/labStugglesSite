const FosterPost = require('../models').FosterPost;


module.exports = {
  create(req, res) {
    console.log(req.body)
    return FosterPost
      .create({
        picUrl: req.body.picUrl,
        postUrl: req.body.postUrl,
        title: req.body.title,
        location: req.body.location,
        latitude: req.body.latitude,
        longitude: req.body.longitude
      })
      .then(fosterpost => res.status(201).send(fosterpost))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return FosterPost
      .all()
      .then(fosterposts => res.status(200).send(fosterposts))
      .catch(error => res.status(400).send(error));
  },
};