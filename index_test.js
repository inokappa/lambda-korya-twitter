console.log('Loading event');
//
var config = require('./config');
var twitter = require('mtwitter');

exports.handler = function(event, context) {
  // Generate post data
  var message = event.Records[0].Sns.Message;
  var tweet   = {status: message.message };

  var tw = new twitter({
    consumer_key        : config.consumer_key,
    consumer_secret     : config.consumer_secret,
    access_token_key    : config.access_token_key,
    access_token_secret : config.access_token_secret
  });

  // debug
  console.log(message);

  // Post to twitter
  console.log('Sending twitter: ');
  console.log('Message: ' + tweet);
  tw.post('statuses/update', tweet, function(err, item) {
    if (err) {
      return console.error('Message send failed:', err);
    }
    console.log('Message send successful!  Created with:', item.created_at);
    context.done(null,'');
  });
};
