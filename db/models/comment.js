'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    text: DataTypes.STRING
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.Post, {
        foreignKey: "postId"
      })
    Comment.belongsTo(models.User, {
        foreignKey: "userId"
      })
  };
  return Comment;
};
