import Avatar from '../models/Avatar'

class AvatarController {
    async store(req, res) {
        const { originalname: name, filename: path } = req.file

        try {
            const avatar = await Avatar.create({
                name,
                path,
            })

            res.status(200).json(avatar)
        } catch {
            res.status(400).json({ error: 'Bad Request' });
        }
    }

    async index(req, res) {
        try {
            const files = await Avatar.findAll()
            return res.json(files)

        } catch {
            res.status(400).json({ error: 'Bad Request' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const avatar = await Avatar.findByPk(id)

            const { originalname: name, filename: path } = req.file
            console.log('avatars => ', avatar)

            if (path !== avatar.path) {

                const fileExistis = await Avatar.findOne({ where: { path } })

                if (fileExistis) {
                    return res.status(400).json({ error: 'Avatar already exists' })
                }
            }

            const updateAvatar = await avatar.update({
                name,
                path,
            })

            res.status(200).json(updateAvatar)

        } catch {
            res.status(400).json({ error: 'Bad Request' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            const avatar = await Avatar.findByPk(id)

            const deleteAvatar = await avatar.destroy(req.body)

            res.status(200).json(deleteAvatar)

        } catch {
            res.status(400).json({ error: 'Bad Request' });
        }
    }
}

export default new AvatarController()