import Sequelize, { Model } from 'sequelize'

class Role extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
    this.hasMany(models.User, {
      foreignKey: 'role_id',
      as: 'users',
    })
  }
}

export default Role