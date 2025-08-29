'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

admin.initializeApp();

exports.setCors = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const bucket = admin.storage().bucket('gs://db-portfolio-web');
    const corsConfig = [
      {
        origin: ['https://hyperionzs.github.io'],
        method: ['GET', 'POST', 'PUT'],
        maxAgeSeconds: 3600
      }
    ];
    bucket.setCorsConfiguration(corsConfig)
      .then(() => {
        res.status(200).send('CORS configuration set successfully');
      })
      .catch(err => {
        res.status(500).send('Error setting CORS configuration: ' + err);
      });
  });
});