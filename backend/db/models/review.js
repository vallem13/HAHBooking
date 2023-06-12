'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {
        foreignKey: 'userId',
      })

      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId',
      })

      Review.hasMany(models.ReviewImage, {
        foreignKey: 'reviewId',
        onDelete: 'CASCADE',
        hooks: true
      })
    }
  }
  Review.init({
    spotId: {
      tyoe: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      tyoe: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      tyoe: DataTypes.STRING,
      allowNull: false,
      validate: {
        reviewText(value) {
          if(value === '') throw new Error('Review text is required')
        }
      }
    },
    stars: {
      tyoe: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
        starsScore(value) {
          if(value < 1 || value > 5) throw new Error('Stars must be an integer from 1 to 5')
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
