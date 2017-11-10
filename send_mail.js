var fs = require('file-system');
var googleAuth = require('google-auth-library');
var google = require('googleapis');
var config = require('./config.json');

function getOAuth2Client(cb) {
  // Load client secrets
  fs.readFile('client_secret.json', function(err, data) {
    if (err) {
      return cb(err);
    }
    var credentials = JSON.parse(data);
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    // Load credentials
    fs.readFile('gmail-credentials.json', function(err, token) {
      if (err) {
        return cb(err);
      } else {
        oauth2Client.credentials = JSON.parse(token);
        return cb(null, oauth2Client);
      }
    });
  });
}

function sendSampleMail(auth, cb) {
  var gmailClass = google.gmail('v1');

  var email_lines = [];


  email_lines.push('From: ' + config.mail.from);
  email_lines.push('To: ' + config.mail.to);
  email_lines.push('Content-type: ' + config.mail.contentType);
  email_lines.push('MIME-Version: ' + config.mail.mimeVersion);
  email_lines.push('Subject: ' + config.mail.subject);
  email_lines.push('');
  config.mail.body.forEach(function(string){
    email_lines.push(string);
  });
  email_lines.push(config.currentPrice);

  var email = email_lines.join('\r\n').trim();

  var base64EncodedEmail = new Buffer(email).toString('base64');
  base64EncodedEmail = base64EncodedEmail.replace(/\+/g, '-').replace(/\//g, '_');

  gmailClass.users.messages.send({
    auth: auth,
    userId: 'me',
    resource: {
      raw: base64EncodedEmail
    }
  }, cb);
}

if (config.currentPrice !== 0 && config.currentPrice !== undefined && config.currentPrice !== null) {
  if (config.currentPrice < config.pricePaid) {
    getOAuth2Client(function(err, oauth2Client) {
      if (err) {
        console.log('err:', err);
      } else {
        sendSampleMail(oauth2Client, function(err, results) {
          if (err) {
            console.log('err:', err);
          } else {
            console.log('Mail sent: ', results);
          }
        });
      }
    });
  }
  else {
    console.log('No mail sent');
  }
}
