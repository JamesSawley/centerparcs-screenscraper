#!/bin/bash

echo ----------------------------
echo Job starting...
echo
echo Scraping Centerparcs website...
node_modules/.bin/phantomjs scripts/scrape.js
node scripts/send_mail.js
echo ----------------------------
echo job finished
echo ----------------------------
