Comments = new Meteor.Collection("comments");

if (Meteor.isClient) {
  Template.countdown.counter = function () {
    if (Session.get("shutdownCounter"))
      return Math.ceil(Session.get("shutdownCounter") / 1000);
  };

  Template.comments.events = {
    "submit #commentForm": function (evt) {
      evt.preventDefault();
      Comments.insert({
        author: $("#author").val(),
        comment: $("#comment").val()
      });
      $("#comment").val("");
      return false;
    }
  };

  Template.comments.comments = function () {
    return Comments.find();
  };

  Template.comments.authorName = function () {
    if (Meteor.user())
      return Meteor.user().emails[0].address;
  };

  Meteor.setInterval(function () {
    var shutdown = new Date("February 7, 2014");
    Session.set("shutdownCounter",
                shutdown.valueOf() - (new Date()).valueOf());
  }, 1000);
}
