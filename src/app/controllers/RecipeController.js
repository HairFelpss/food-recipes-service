import Recipe from '../models/Recipe'
import Type from '../models/Type'
import File from '../models/File'

class RecipeController {
    async store(req, res) {
        try {
            req.setTimeout(0)
            const { types, ...data } = req.body
            console.log('types =>> ', types)
            const recipeExistis = await Recipe.findOne({ where: { name: req.body.name } })

            if (recipeExistis) {
                return res.status(400).json({ error: 'Recipe already exists' })
            }

            const recipe = await Recipe.create(data)

            if (types && types.length > 0) {
                await recipe.setTypes(types)
            }

            return res.json(recipe)

        } catch (err) {
            console.log('err => ', err)
        }
    }

    async index(req, res) {
        try {
            const recipes = await Recipe.findAll(
                {
                    attributes: ['id', 'name', 'introduction', 'steps', 'ingredients', 'preparation_time', 'qt_yield', 'difficulty'],
                    include: [
                        {
                            model: File,
                            as: 'pictures',
                            attributes: ['url', 'id', 'path', 'name']
                        }
                    ]
                })
            return res.json(recipes)

        } catch (err) {
            console.log('err => ', err)
        }
    }

    async indexJustOne(req, res) {
        try {
            const { id } = req.params
            const recipes = await Recipe.findByPk(id,
                {
                    attributes: ['id', 'name', 'introduction', 'steps', 'ingredients', 'preparation_time', 'qt_yield', 'difficulty'],
                    include: [
                        {
                            model: File,
                            as: 'pictures',
                            attributes: ['url', 'id', 'path', 'name']
                        }
                    ],
                    include: [
                        {
                            model: Type,
                            as: 'types',
                            through: { attributes: ['id'] }
                        }
                    ]
                })
            return res.json(recipes)

        } catch (err) {
            console.log('err => ', err)
        }
    }

    async update(req, res) {
        try {

            const { id } = req.params
            const recipe = await Recipe.findByPk(id)

            if (req.body.name !== recipe.name) {

                const recipeExistis = await Recipe.findOne({ where: { name: req.body.name } })

                if (recipeExistis) {
                    return res.status(400).json({ error: 'Recipe already exists' })
                }
            }

            const updateRecipe = await recipe.update(req.body)

            res.json(updateRecipe)

        } catch (err) {
            console.log('err => ', err)
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id
            const recipe = await Recipe.findByPk(id)
            const { photo_id } = recipe
            const file = await File.findByPk(photo_id)
            const deleteRecipe = await recipe.destroy(req.body)
            const deleteFile = await file.destroy(req.body)
            res.json({ deleteRecipe, deleteFile })

        } catch (err) {
            console.log('err => ', err)
        }
    }
}

export default new RecipeController()