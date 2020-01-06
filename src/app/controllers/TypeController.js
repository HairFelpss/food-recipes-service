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
            console.log(req.body)
            const type = await Type.create(data)

            if (recipes && recipes.length > 0) {
                type.setRecipes(recipes)
            }

            return res.status(200).json(type)

        } catch {
            res.status(400).json({ error: 'Bad Request' });
        }
    }

    async index(req, res) {

        try {
            const types = await Type.findAll({
                include: [{
                    model: Recipe,
                    as: 'recipes',
                    through: { attributes: [] },
                }]
            })

            return res.status(200).json(types)

        } catch {
            res.status(400).json({ error: 'Bad Request' });
        }
    }

    async update(req, res) {
        try {

            const { id } = req.params
            const type = await Type.findByPk(id)

            if (req.body.name !== type.name) {

                const typeExistis = await Type.findOne({ where: { name: req.body.name } })

                if (typeExistis) {
                    return res.status(400).json({ error: 'Type already exists' })
                }
            }

            const updateType = await type.update(req.body)

            res.status(200).json(updateType)

        } catch {
            res.status(400).json({ error: 'Bad Request' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            const type = await Type.findByPk(id)

            const deleteType = await type.destroy(req.body)

            res.status(200).json(deleteType)

        } catch {
            res.status(400).json({ error: 'Bad Request' });
        }
    }
}

export default new TypeController()