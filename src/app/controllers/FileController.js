import File from '../models/File'

class FileController {
    async store(req, res) {

        try {
            const { originalname: name, filename: path } = req.file

            const file = await File.create({
                name,
                path,
            })

            res.status(200).json(file)
        } catch {
            res.status(400).json({ error: 'Bad Request' });
        }
    }

    async index(req, res) {
        try {
            const files = await File.findAll()
            return res.json(files)

        } catch {
            res.status(400).json({ error: 'Bad Request' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
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

            res.status(200).json(updateFile)

        } catch {
            res.status(400).json({ error: 'Bad Request' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            const file = await File.findByPk(id)

            const deleteFile = await file.destroy(req.body)

            res.status(200).json(deleteFile)

        } catch {
            res.status(400).json({ error: 'Bad Request' });
        }
    }
}

export default new FileController()