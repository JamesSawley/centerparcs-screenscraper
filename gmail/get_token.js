var fs = require('fs');
var googleAuth = require('google-auth-library');

function getAuthorizationToken(code, cb) {
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

    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        return cb(err);
      }
      var file = 'gmail-credentials.json';

      fs.writeFile(file, JSON.stringify(token));
      return cb(null, file);
    });
  });
}

if (process.argv.length != 3) {
  console.log('usage: node get_token token');
  process.exit(1);
}
var token = process.argv[2];

getAuthorizationToken(token, function(err, file) {
  if (err) {
    console.log('err:', err);
  } else {
    console.log('authorization token is in:\n', file);
  }
});
