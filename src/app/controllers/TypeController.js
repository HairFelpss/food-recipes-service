import Type from '../models/Type'
import Recipe from '../models/Recipe'

class TypeController {
    async store(req, res) {

        try {
            const { recipes, ...data } = req.body
            const typeExistis = await Type.findOne({ where: { name: req.body.name } })

            if (typeExistis) {
                return res.status(400).json({ error: 'Type already exists' })
            }
            const type = await Type.create(data)

            if (recipes && recipes.length > 0) {
                type.setRecipes(recipes)
            }

            return res.json(type)

        } catch (err) {
            console.log('err => ', err)
        }
    }

    async index(req, res) {

        try {

            const types = await Type.findAll({
                include: [
                    {
                        model: Recipe,
                        as: 'recipes',
                        through: {
                            attributes: [
                                'id',
                                'name',
                                'introduction',
                                'steps',
                                'ingredients',
                                'preparation_time',
                                'qt_yield',
                                'difficulty',
                                'types',
                                'pictures',
                                'tags',
                            ]
                        },
                    }
                ]
            })

            const { id, name, recipes } = types[0]
            return res.json({ id, name, recipes })

        } catch (err) {
            console.log('err => ', err)
        }
    }

    async update(req, res) {
        try {

            const id = req.userId
            const type = await Type.findByPk(id)

            if (req.body.name !== type.name) {

                const typeExistis = await Type.findOne({ where: { name: req.body.name } })

                if (typeExistis) {
                    return res.status(400).json({ error: 'Type already exists' })
                }
            }

            const updateType = await type.update(req.body)

            res.json(updateType)

        } catch (err) {
            console.log('err => ', err)
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id
            const type = await Type.findByPk(id)

            const deleteType = await type.destroy(req.body)

            res.json(deleteType)

        } catch (err) {
            console.log('err => ', err)
        }
    }
}

export default new TypeController()