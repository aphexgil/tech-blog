const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

Blog.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'blog_user'
});

User.hasMany(Blog, {
  as: 'blogs'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'comment_user'
});

User.hasMany(Comment);

Comment.belongsTo(Blog, {
  foreignKey: 'blog_id'
});

Blog.hasMany(Comment, {
  as: 'comments'
});


module.exports = { User, Blog, Comment };
