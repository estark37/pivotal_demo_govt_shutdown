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

  Template.comments.userId = function () {
    return Meteor.userId();
  };

  Template.comment.commentAuthor = function () {
    var userId = this.author;
    if (userId && Meteor.users.findOne(userId))
      return Meteor.users.findOne(userId).emails[0].address;
  };

  Meteor.setInterval(function () {
    var shutdown = new Date("February 7, 2014");
    Session.set("shutdownCounter",
                shutdown.valueOf() - (new Date()).valueOf());
  }, 1000);

  Deps.autorun(function () {
    if (Meteor.userId())
      Meteor.subscribe("commentsByAuthor", Meteor.userId());
  });
}
