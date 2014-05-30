var Twit = Meteor.require("twit");
var conf = JSON.parse(Assets.getText('twitter.json'));

var T = new Twit({
    consumer_key: conf.consumer.key,
    consumer_secret: conf.consumer.secret,
    access_token: conf.access_token.key,
    access_token_secret: conf.access_token.secret
});

/*Router.map(function(){
	this.route('home', { path: '/' });
});*/

var keywords = ['brazil', 'soccer'];

var stream = T.stream('statuses/filter', { track: '#WorldCup2014' }); 

stream.on('tweet', Meteor.bindEnvironment(function(tweet) {


    if(tweet.text.match(new RegExp(keywords.join("|"), "gi"))){
        console.log('brazil');
        Tweets.insert({ country: 'brazil', match_id: '2' });
    }
    else {
        console.log('france');
        Tweets.insert({ country: 'france', match_id: '2' });
    }

    Messages.insert({name: tweet.user.name, message: tweet.text, time: moment(tweet.created_at).toDate(), match_id: '2'});
}));

Meteor.publish('messages', function(match_id) {
  return Messages.find({match_id : match_id});
});

Meteor.publish('tweets', function(match_id) {
  return Tweets.find({match_id : match_id});
});
