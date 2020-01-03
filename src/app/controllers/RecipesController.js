class RecipesController {
    async store (req, res){
        console.log(res)
    
        try {
            return res.json({ ok: true})
        }catch (err) {
            console.log('err => ', err)
        }
    }
}

export default new RecipesController()