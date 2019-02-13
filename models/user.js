'use strict';
let log = require('torch')

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        notEmpty:{
            args:true,
            msg:"Email-id required"
        },
        isEmail:{
            args:true,
            msg:'Valid email-id required'
        }
    },
   unique: { msg: 'Email address already in use!' }

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