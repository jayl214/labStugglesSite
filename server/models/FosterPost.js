'use strict';
module.exports = (sequelize, DataTypes) => {
  const FosterPost = sequelize.define('FosterPost', {
    picUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    }
  }, {});
  FosterPost.associate = function(models) {
    // associations can be defined here
  };
  return FosterPost;
};