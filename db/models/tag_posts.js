'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag_Post = sequelize.define('Tag_Post', {
    postId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  Tag_Post.associate = function(models) {
    Tag_Post.belongsTo(models.Tag, {
      foreignKey: "tagId"
    }),
    Tag_Post.belongsTo(models.Post, {
        foreignKey: "postId"
    })
  };
  return Tag_Post;
};
