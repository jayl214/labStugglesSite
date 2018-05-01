const Comic = require('../models').Comic;


module.exports = {
  create(req, res) {
    console.log(req.body)
    return Comic
      .create({
        title: req.body.title,
        url: req.body.url,
      })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },
};