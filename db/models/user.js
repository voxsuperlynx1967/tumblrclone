'use strict';
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validates: {
          isEmail: true,
          len: [3, 255],
        },
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        validates: {
          len: [1, 255],
        },
      },
      hashedPassword: {
        allowNull: false,
        type: DataTypes.STRING.BINARY,
        validates: {
          len: [60, 60],
        },
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );

  User.associate = function(models) {
    User.hasMany(models.Post, {
      foreignKey: "userId"
    })
  };

  User.prototype.toSafeObject = function() {
    const {
      id,
      username
    } = this;

    return { id, username };
  };

  User.login = async function({ email, password }) {
    const user = await User.scope('loginUser').findOne({
      where: {
        email
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function(id) {
    return await User.scope("currentUser").findByPk(id);
  };

  User.signup = async function({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword
    });
    return await User.scope("currentUser").findByPk(user.id);
  };

  return User;
};
