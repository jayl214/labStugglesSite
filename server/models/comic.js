module.exports = (sequelize, DataTypes) => {
  const Comic = sequelize.define('Comic', {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Comic.associate = (models) => {
    // Todo.hasMany(models.TodoItem, {
    //   foreignKey: 'todoId',
    //   as: 'todoItems',
    // });
  };

  return Comic;
};};