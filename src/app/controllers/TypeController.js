import Type from '../models/Type'
import Recipe from '../models/Recipe'
import File from '../models/File'

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
                attributes: ['id', 'name', 'photo_id'],
                include: [
                    {
                        model: File,
                        as: 'pictures',
                        attributes: ['url', 'id', 'path']
                    }
                ]
            })

            return res.json(types)

        } catch (err) {
            console.log('err => ', err)
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

            res.json(updateType)

        } catch (err) {
            console.log('err => ', err)
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            const type = await Type.findByPk(id)
            const { photo_id } = type
            const file = await File.findByPk(photo_id)
            const deleteType = await type.destroy(req.body)
            const deleteFile = await file.destroy(req.body)

            res.json({ deleteType, deleteFile })

        } catch (err) {
            console.log('err => ', err)
        }
    }
}

export default new TypeController()