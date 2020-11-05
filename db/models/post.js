'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    postType: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    mediaLink: DataTypes.STRING,
    caption: DataTypes.STRING,
    reblogUserId: DataTypes.INTEGER,
    noteCount: DataTypes.INTEGER
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.User, {
      as: "Poster",
      foreignKey: "userId",
    }),
    Post.belongsTo(models.User, {
        as: "Reblog",
        foreignKey: "reblogUserId"
    })
    Post.belongsToMany(models.Tag, {
        through: models.Tag_Post,
        foreignKey: "postId"
    })
    Post.hasMany(models.Tag_Post, {
        foreignKey: "postId"
      })
    Post.hasMany(models.Like, {
        foreignKey: "postId"
    })
    Post.hasMany(models.Comment, {
        foreignKey: "postId"
    })



  };
  return Post;
};
