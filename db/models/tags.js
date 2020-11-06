'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    title: DataTypes.STRING
  }, {});
  Tag.associate = function(models) {
    Tag.belongsToMany(models.Post, {
        through: models.Tag_Post,
        foreignKey: "tagId"
    })
    Tag.hasMany(models.Tag_Post, {
        foreignKey: "tagId"
    })
  };
  return Tag;
};
