# centerparcs-screenscraper
This repo is for people who have a 'come back soon' deal on Centerparcs, but are too lazy to check the site everyday. There is a little upfront effort required, but once you've configured this node.js app, you can sit back and wait for the savings to come rolling in :pound: :pound: :pound:.

## Installation
1. Create a [Heroku](https://www.heroku.com/) account if you don't have one already.

2. Install the Heroku cli and login
   ```
   npm install -g heroku-cli
   heroku login
   ```
   
2. Clone the repo:
   ```
   git clone https://github.com/sawdust1993/centerparcs-screenscraper.git
   cd centerparcs-screenscraper
   ```
   
3. Create a new app on Heroku.
   ```
   heroku create <PROJECT_NAME>
   ```
   
4. Provision SendMail by following the instructions on ['Provisioning the add-on'](https://devcenter.heroku.com/articles/sendgrid#provisioning-the-add-on), ['Obtaining an API key'](https://devcenter.heroku.com/articles/sendgrid#obtaining-an-api-key) and ['Setup API key environment variable'](https://devcenter.heroku.com/articles/sendgrid#setup-api-key-environment-variable). Make sure to edit the config vars on your app’s settings tab on the Dashboard.

5. Install dependencies
   ```
   npm install
   ```
   
6. Congratulate yourself. That's the hard bit done.

## Personalise your configuration
Complete the following:
* email - where do you want the notification to go?
  String

* pricePaid - how much did you pay?

* location - which forest?
  * "WO" - Woburn Forest

* date - what date will you arrive?

* lodge - What type of lodge?

* nights - How many nights are you staying?

* adults - How many adults?

* children - How many children?

* toddlers - How many toddlers?

* infants - How many infants?

* dogs - How many dogs?

* accessible - Do you require an accessible lodge?

... and ignore the following
* currentPrice
* skip

## Run it locally
`npm start` does the job :ok_hand:.

## Deploy it.

## What happens now?

## License
[MIT]()
