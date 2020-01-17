import Sequelize, { Model } from 'sequelize'
import brycpt from 'bcryptjs'

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await brycpt.hash(user.password, 10)
      }
    })

    return this
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' })
    this.belongsTo(models.Role, {
      foreignKey: 'role_id',
      as: 'role',
    })
  }

  checkPassword(password) {
    return brycpt.compare(password, this.password_hash)
  }
}

export default User