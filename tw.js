console.log('Loading event');
//
var config = require('./config');
var twitter = require('mtwitter');

// Generate post data
var tweet   = {status: 'らむだこりゃ'};

console.log(config)
var tw = new twitter({
  consumer_key        : config.consumer_key,
  consumer_secret     : config.consumer_secret,
  access_token_key    : config.access_token_key,
  access_token_secret : config.access_token_secret
});

// Post to twitter
console.log('Sending twitter: ');
console.log('Message: ' + tweet);
tw.post('statuses/update', tweet, function(err, item) {
  if (err) {
    return console.error('Message send failed:', err);
  }
  context.done(null,'');
});
