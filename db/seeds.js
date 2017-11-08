const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Postbox = require('../models/postbox');

const postboxesData = [
  {lat: 51.508043, lng: -0.27230519, lastCollection: '17:30', saturdayCollection: '12:00'},
  {lat: 51.491787, lng: -0.26269224, lastCollection: '17:30', saturdayCollection: '12:00'},
  {lat: 51.41496, lng: -0.054118569, lastCollection: '17:30', saturdayCollection: '12:00'},
  {lat: 51.613829, lng: -0.095066713, lastCollection: '17:30', saturdayCollection: '12:00'},
  {lat: 51.500073, lng: -0.17011, lastCollection: '17:30', saturdayCollection: '12:00'},
  {lat: 51.489499, lng: -0.04109358, lastCollection: '17:30', saturdayCollection: '12:00'}
];

mongoose.connect(dbURI, { useMongoClient: true })
  .then(db => db.dropDatabase())
  .then(() => Postbox.create(postboxesData))
  .then(postboxes => console.log(`${postboxes.length} postboxes created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
