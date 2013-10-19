// This code only runs on the server.

Meteor.publish("commentsByAuthor", function (author) {
  return Comments.find({ author: author });
});
