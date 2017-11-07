#!/bin/bash

echo job starting...

node_modules/.bin/phantomjs scrape.js
node send_mail.js

echo job finished
