# Real Time Tone Analysis

[Blog post here][bg].

![app](http://jkaufman.io/assets/images/post-images/ambient-sentiment-2/app.gif)

This is a fun little demo using websockets and [Watson Tone Analytics][ta].
When a user submits text to the app, we run tone analytics on it and then
convert that tone to a color.

Using the magic of websockets all clients stay in sync - i.e. you see when other
people are analyzing text and your background color updates with them etc etc.

## App Structure

There are only two app files - `server.js` and `index.html`. Read
[my blog post][bg] for a breakdown on what they each do.

## To run the app

Prerequisites:

  - Have a [Bluemix](http://bluemix.net) account
  - Create a nodejs runtime
  - Bind the [Tone Analytics][ta] service to your app
  - Replace `username` and `password` in `server.sh` with your actual username
    and password for tone analytics.

```sh
npm install
npm run start
```

[ta]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/tone-analyzer.html
[bg]: http://jkaufman.io/ambient-sentiment-part-two/
