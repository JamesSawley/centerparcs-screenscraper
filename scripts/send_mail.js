const fs = require('file-system');
const googleAuth = require('google-auth-library');
const google = require('googleapis');
const json = require('../config.json');

const config = json.config;
const mail = json.mail;

function getOAuth2Client(cb) {
  // Load client secrets
  fs.readFile('client_secret.json', function(err, data) {
    if (err) {
      return cb(err);
    }
    const credentials = JSON.parse(data);
    const clientSecret = credentials.installed.client_secret;
    const clientId = credentials.installed.client_id;
    const redirectUrl = credentials.installed.redirect_uris[0];
    const auth = new googleAuth();
    const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

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
  const gmailClass = google.gmail('v1');

  const email_lines = [];


  email_lines.push('From: ' + mail.from);
  email_lines.push('To: ' + mail.to);
  email_lines.push('Content-type: ' + mail.contentType);
  email_lines.push('MIME-Version: ' + mail.mimeVersion);
  email_lines.push('Subject: ' + mail.subject);
  email_lines.push('');
  mail.body.forEach(function(string){
    email_lines.push(string);
  });
  email_lines.push(config.currentPrice);

  const email = email_lines.join('\r\n').trim();

  let base64EncodedEmail = new Buffer(email).toString('base64');
  base64EncodedEmail = base64EncodedEmail.replace(/\+/g, '-').replace(/\//g, '_');

  gmailClass.users.messages.send({
    auth: auth,
    userId: 'me',
    resource: {
      raw: base64EncodedEmail
    }
  }, cb);
}

const sendMail = () => {
	console.log('');
	console.log('-------- Section 4 - Send email --------');
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
	    console.log('Price not cheaper. No mail sent');
	  }
	}
	else {
	  console.log('Error finding price. No mail sent');
	}
	console.log('');
};

module.exports = sendMail;
