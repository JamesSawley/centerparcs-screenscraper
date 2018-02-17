# centerparcs-screenscraper
This repo is for people who have a 'come back soon' deal on Centerparcs, but are too lazy to check the site everyday. Once you've configured this to run in your terminal, you can sit back and wait for the savings to come rolling in :pound: :pound: :pound:.

## Installation

1. Clone the repo:
   ```
   git clone https://github.com/sawdust1993/centerparcs-screenscraper.git
   cd centerparcs-screenscraper
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Go and make a brew, it'll be finished when you get back.

4. [Personalise your configuration](#personalise)

5. [Run it](#run).

## Personalise your configuration <a name="personalise"></a>
Complete the following in centerparcs-screenscraper/config.json. If you want to run multiple instances of the price checker, simply add another object into the config array...

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

## Run it <a name="run"></a>
By default the app runs just once... you can change this and run it on a schedule if you like :ok_hand::
```
npm start     	   //just once (default)
npm start hour     //once per hour
npm start quarter  //once every 15 minutes
npm start five     //once every 5 minutes
npm start minute   //once a minute
```

## What happens now?
The app will scan the Centerparcs website in the frequency you have specified. If the price it finds is cheaper than the price you paid, then it will notify you.

Note: It's your responsibility to contact centerparcs to get the cheaper price.

## Contributions
Feel free to fork and improve however you'd like.

## License
[MIT](https://github.com/sawdust1993/centerparcs-screenscraper/blob/master/LICENSE)
