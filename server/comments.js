// This code only runs on the server.

Comments.allow({
  insert: function (userId, comment) {
    if (! userId)
      return false;
    return userId === comment.author;
  }
});

Meteor.publish("commentsByAuthor", function (author) {
  return Comments.find({ author: author });
});
