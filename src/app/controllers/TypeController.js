import Type from '../models/Type'
import { types } from 'pg'

class TypeController {
    async store (req, res){
        
        try {
            const { name } = req.body
            console.log(name)
            const typeExistis = await Type.findOne({ where: { name } })

            if(typeExistis){
                return res.status(400).json({ error: 'Type already exists'})
            }

            const type = await Type.create(req.body)
            return res.json(type)
        
        }catch (err) {
            console.log('err => ', err)
        }
    }

    async index(req, res) {
      
        try {
            const recipes = await Type.findAll()

            return res.json(recipes)
       
        }catch(err){
            console.log('err => ', err)
        }
    }
}

export default new TypeController()