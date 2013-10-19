if (Meteor.isClient) {
  Template.countdown.counter = function () {
    if (Session.get("shutdownCounter"))
      return Math.ceil(Session.get("shutdownCounter") / 1000);
  };

  Template.comments.events = {
    "submit #commentForm": function (evt) {
      evt.preventDefault();
      Meteor.call("addComment", {
        author: $("#author").val(),
        comment: $("#comment").val()
      }, function (err) {
        if (err)
          alert("Your comment didn't work!");
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

// This code runs on both the client and server.
Meteor.methods({
  addComment: function (comment) {
    var loggedInUser = this.userId;
    if (! loggedInUser)
      throw new Meteor.Error("Can't add comment when logged out!");

    if (comment.comment &&
        comment.comment.length <= 140 &&
        comment.author === loggedInUser)
      Comments.insert(comment);
    else
      throw new Meteor.Error("Bad comment");
  }
});
