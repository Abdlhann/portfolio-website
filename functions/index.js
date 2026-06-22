'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

admin.initializeApp();

exports.setCors = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const bucket = admin.storage().bucket('gs://db-portfolio-web-140eb');
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

// One-time function to create admin user
exports.createAdminUser = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const userRecord = await admin.auth().createUser({
        email: 'hannan335@gmail.com',
        emailVerified: true,
        password: 'Hnvsvnsid2',
        displayName: 'Admin',
      });
      
      // Set custom claims to mark as admin
      await admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });
      
      res.status(200).json({
        success: true,
        uid: userRecord.uid,
        email: userRecord.email,
        message: 'Admin user created successfully'
      });
    } catch (error) {
      if (error.code === 'auth/email-already-exists') {
        res.status(409).json({
          success: false,
          message: 'Admin user already exists with this email'
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Error creating admin user: ' + error.message
        });
      }
    }
  });
});