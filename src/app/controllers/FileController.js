import File from '../models/File'

class FileController {
    async store(req, res) {

        try {
            const { originalname: name, filename: path } = req.file

            const file = await File.create({
                name,
                path,
            })

            res.json(file)
        } catch (err) {
            console.log('err => ', err)
        }
    }

    async index(req, res) {
        try {
            const files = await File.findAll()
            const { id, url } = files[0]
            return res.json({ id, url })

        } catch (err) {
            console.log('err => ', err)
        }
    }

    async update(req, res) {
        try {
            const id = req.userId
            const file = await File.findByPk(id)

            const { originalname: name, filename: path } = req.file

            if (path !== file.path) {

                const fileExistis = await File.findOne({ where: { path } })

                if (fileExistis) {
                    return res.status(400).json({ error: 'File already exists' })
                }
            }

            const updateFile = await file.update({
                name,
                path,
            })

            res.json(updateFile)

        } catch (err) {
            console.log('err => ', err)
        }
    }

    async delete(req, res) {
        try {
            const id = req.userId
            const file = await File.findByPk(id)

            const deleteFile = await file.destroy(req.body)

            res.json(deleteFile)

        } catch (err) {
            console.log('err => ', err)
        }
    }
}

export default new FileController()