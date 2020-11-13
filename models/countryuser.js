'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CountryUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CountryUser.init({
    countryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    countryName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CountryUser',
  });
  return CountryUser;
};