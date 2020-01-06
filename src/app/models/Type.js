import Sequelize, { Model } from 'sequelize'

class Type extends Model {
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
        this.belongsToMany(models.Recipe, { 
            through: 'tags',
            as: "recipes",
            foreignKey: 'type_id',
        })
    }
}

export default Type