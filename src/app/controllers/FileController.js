import File from '../models/File'

class FileController {
    async store (req, res){
        const { originalname: name, filename: path } = req.file

        try {
            const file = await File.create({
                name,
                path,
            })

            res.json(file)
        }catch (err) {
            console.log('err => ', err)
        }
    }
}

export default new FileController()