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
   heroku create <APP_NAME>
   ```
   where <APP_NAME> is whatever you want it to be.
   
4. Add puppeteer build pack
   ```
   heroku buildpacks:set https://github.com/jontewks/puppeteer-heroku-buildpack -a <APP_NAME>
   ```
5. Provision SendMail by following the instructions on ['Provisioning the add-on'](https://devcenter.heroku.com/articles/sendgrid#provisioning-the-add-on), ['Obtaining an API key'](https://devcenter.heroku.com/articles/sendgrid#obtaining-an-api-key) and ['Setup API key environment variable'](https://devcenter.heroku.com/articles/sendgrid#setup-api-key-environment-variable). Make sure to edit the config vars on your app’s settings tab on the Dashboard.

6. Install dependencies
   ```
   npm install
   ```
   
7. Congratulate yourself. That's the hard bit done.

## Personalise your configuration
Complete the following:
* email - where do you want the notification to go?

* pricePaid - how much did you pay?

* location - which forest?

  Code | Forest
  --- | ---
  "WF" | Whinfell Forest, Cumbria
  "SF" | Sherwood Forest, Nottinghamshire
  "EF" | Elveden Forest, Suffolk
  "WO" | Woburn Forest, Bedfordshire
  "LF" | Longleat Forest, Wiltshire

* date - what date will you arrive?

* lodge - What type of lodge?

  Code | Lodge Type
  --- | ---
  "HR1T" | 1 bedroom Executive twin hotel room
  "HR1D" | 1 bedroom Executive double hotel room
  "XS1T" | 1 bedroom Executive Apartment, twin
  "XS1" | 1 bedroom Executive Apartment, double
  "WL2" | 2 bedroom Woodland Lodge
  "XL2" | 2 bedroom Executive Lodge
  "WL3" | 3 bedroom woodland lodge
  "XL3" | 3 bedroom executive lodge
  "WL4" | 4 bedroom woodland lodge
  "XL42" | 4 bedroom executive lodge
  "XL4U" | 4 bedroom Executive Lodge with split-level layout
  "ZL4G" | 4 bedroom Exclusive Lodge with outdoor spa area
                              
* nights - How many nights are you staying?

* adults - How many adults (16+)?

* children - How many children (6-16)?

* toddlers - How many toddlers (2-5)?

* infants - How many infants (0-2)?

* dogs - How many dogs?

* accessible - Do you require an adapted lodge?

  Code | Lodge Type
  --- | ---
  "Y" | Adapted
  "N" | Not adapted

... and ignore the following
* currentPrice
* skip

## Run it locally
`npm start` does the job :ok_hand:.

## Deploy it.
```
git push heroku master
```

## What happens now?
Once Heroku has built and deployed the application, the app will scan the Centerparcs website on the hour, every hour. If the price it finds is cheaper than the price you paid, then it will send you an email.

Note: It's your responsibility to contact centerparcs to get the cheaper price. 

## Contributions
All contributions welcome. Feel free to fork and improve however you'd like.

## License
[MIT]()
