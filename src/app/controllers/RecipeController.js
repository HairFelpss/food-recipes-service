import Recipe from '../models/Recipe'
import Type from '../models/Type'
import File from '../models/File'

class RecipeController {
    async store (req, res){
        try {

            const { types, ...data } = req.body
            const recipeExistis = await Recipe.findOne({ where: { name: req.body.name } })

            if(recipeExistis){
                return res.status(400).json({ error: 'Recipe already exists'})
            }

            const recipe = await Recipe.create(data)

            if(types && types.length > 0){
                await recipe.setTypes(types)
            }

            return res.json(recipe)
        
        }catch (err) {
            console.log('err => ', err)
        }
    }

    async index (req, res){
        try {
            const recipes = await Recipe.findAll({
                include: [
                    {
                        model: Type,
                        as: 'types',
                        through: { attributes : [] },
                    },
                    {
                        model: File,
                        as: 'pictures'
                    }
                ]
            })
            return res.json(recipes)
       
        }catch(err){
            console.log('err => ', err)
        }
    }

    async update(req, res) {
        try{

           const id = req.userId
            const recipe = await Recipe.findByPk(id)
            console.log('inside update => ', recipe)
            if(req.body.name !== recipe.name){

                const recipeExistis = await Recipe.findOne({ where: { name: req.body.name } })

                if(recipeExistis){
                    return res.status(400).json({ error: 'Recipe already exists'})
                }
            }

            const updateRecipe = await recipe.update(req.body)

            res.json(updateRecipe)

        }catch(err){
            console.log('err => ', err)
        }
    }

    async delete(req, res) {
        try{
           const id = req.userId
            const recipe = await Recipe.findByPk(id)

            const deleteRecipe = await recipe.destroy(req.body)

            res.json(deleteRecipe)

        }catch(err){
            console.log('err => ', err)
        }
    }
}

export default new RecipeController()