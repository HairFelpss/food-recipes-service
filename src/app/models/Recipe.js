import Sequelize, { Model } from 'sequelize'

class Recipe extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                introduction: Sequelize.STRING,
                steps: Sequelize.STRING,
                ingredients: Sequelize.STRING,
                preparation_time: Sequelize.STRING,
                qt_yield: Sequelize.STRING,
                difficulty: Sequelize.STRING,
            },
            {
                sequelize,
            }
        )

        return this
    }
    static associate(models) {
        this.belongsTo(models.File, { foreignKey: 'photo_id' })
        this.belongsToMany(models.Type, { 
            through: 'tags',  
            as: "types",
            foreignKey: 'recipe_id',
        })
    }
}

export default Recipe