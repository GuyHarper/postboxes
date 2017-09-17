const Postbox = require('../models/postbox');

function postboxesIndex(req, res) {
  Postbox
    .find().limit(5)
    .exec()
    .then(postboxes => res.json(postboxes))
    .catch(err => res.status(500).json(err));
}

function postboxesShow(req, res) {
  Postbox
    .findById(req.params.id)
    .exec()
    .then(postbox => res.json(postbox))
    .catch(err => res.status(500).json(err));
}

function postboxesCreate(req, res) {
  Postbox
    .create(req.body)
    .then(postbox => res.status(201).json(postbox))
    .catch(err => res.status(500).json(err));
}

function postboxesUpdate(req, res) {
  Postbox
    .findById(req.params.id)
    .exec()
    .then(postbox => {
      postbox = Object.assign(postbox, req.body);
      return postbox.save();
    })
    .then(postbox => res.json(postbox))
    .catch(err => res.status(500).json(err));
}

function postboxesDelete(req, res) {
  Postbox
    .findById(req.params.id)
    .exec()
    .then(postbox => {
      postbox.remove();
    })
    .then(() => res.status(204).json())
    .catch(err => res.status(500).json(err));
}

module.exports = {
  index: postboxesIndex,
  show: postboxesShow,
  create: postboxesCreate,
  update: postboxesUpdate,
  delete: postboxesDelete
};
