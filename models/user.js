'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [6, 128],
          msg: "Email address must be between 6 and 128 characters in length"
        },
        isEmail: {
          msg: "Email address must be valid"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 3
        }
      }
    }
    }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};