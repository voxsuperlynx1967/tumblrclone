'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    postType: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    mediaLink: DataTypes.STRING,
    caption: DataTypes.STRING
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.User, {
      foreignKey: "userId"
    })
  };
  return Post;
};
