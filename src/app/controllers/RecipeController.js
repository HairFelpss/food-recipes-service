import Recipe from '../models/Recipe'
import Type from '../models/Type'

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
                recipe.setTypes(types)
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
                        as: 'Types',
                        through: { attributes : [] },
                    }
                ]
            })
            return res.json(recipes)
       
        }catch(err){
            console.log('err => ', err)
        }
    }
}

export default new RecipeController()