/**
* Templates
*/
Router.onBeforeAction('loading');

Router.configure({
  loadingTemplate: 'loading'
});

Router.map(function(){
  this.route('match', {
    path: 'match/:id',
    waitOn: function() {

      match = Matchs.findOne({country: 'brazil'});

      console.log(match);

      return [ Meteor.subscribe('tweets', this.params.id), Meteor.subscribe('messages', this.params.id)];
    },
    data: function (){

      templateData = { 
        messages: Messages.find({}, { sort: { time: -1 }}),

        countBrazil: Tweets.find({ country: 'brazil' }).count(),

        countFrance: Tweets.find({ country: 'france' }).count()
      };

      return templateData;
    }
  });
});