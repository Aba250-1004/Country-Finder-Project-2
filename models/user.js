'use strict';
const bcrypt= require('bcrypt');
const {
  Model
} = require('sequelize');
const db = require('.');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.belongsToMany(models.country,{through:"CountryUser"})
    }
  };
  user.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2,25],
          msg: 'Name must be 2-25 characters long.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 16],
          msg: 'Password must be between 8 and 19 characters.'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  user.addHook('beforeCreate', async (pendingUser, options)=> {
    await bcrypt.hash(pendingUser.password, 10) //pass in the password to be hashed and the number of salts to go through
    .then(hashedPassword=> {
      console.log(`${pendingUser.password} became ----> ${hashedPassword}`);
      //replace the original password with the hash
      pendingUser.password= hashedPassword;
    })
  })

  user.prototype.validPassword= async function (passwordInput){
    try{
      let match= await bcrypt.compare(passwordInput, this.password);
      return match;
    } catch(error){
      console.log(error);
    }
  }

  return user;
};

//sycronous version of addHook
// user.addHook('beforeCreate', (pendingUser, options)=> {
//   let hashedPassword= bcrypt.hashSync(pendingUser.password, 10);
//   console.log(`${pendingUser.password} became ----> ${hashedPassword}`);
//   pendingUser.password= hashedPassword;
// })

//automatically passed into the  instance of the hook is the model 
//The first argument is the instance passing through the lifecycle hook
//All hooks are defined using a function that takes two arguments. The first argument is the instance passing through the lifecycle hook. The second argument is an options object (rarely used - you can often ignore it or exclude it).