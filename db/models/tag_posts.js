'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag_Post = sequelize.define('Tag_Post', {
    postId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  Tag_Post.associate = function(models) {
    Tag_Posts
  };
  return Tag_Post;
};
