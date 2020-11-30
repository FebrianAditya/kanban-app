'use strict';
const {
  Model
} = require('sequelize');
var bcrypt = require('bcryptjs');
require('dotenv').config()
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email cannot empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password cannot empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook("beforeCreate", (instance, options) => {
    let hash = bcrypt.hashSync(instance.password, +process.env.hash);
    instance.password = hash
  })
  return User;
};