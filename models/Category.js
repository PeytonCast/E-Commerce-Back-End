const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');


class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);
module.exports = Category


// Category.sync().then(() => {
//   console.log("Category table synced")
// }).then(() => {
//   module.exports = Category;
// }).catch(() =>{
//   console.log("error Category table failed to sync")
// })

