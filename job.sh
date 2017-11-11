#!/bin/bash

echo ----------------------------
echo Job starting...
echo
echo Scraping Centerparcs website...
node_modules/.bin/phantomjs scrape.js
node send_mail.js
echo ----------------------------
echo job finished
echo ----------------------------
