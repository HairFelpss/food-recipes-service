import User from '../models/User'
import Role from '../models/Role'

class UserController {
    async store(req, res) {
        try {

            const userExists = await User.findOne({ where: { email: req.body.email } })

            if (userExists) {
                return res.status(400).json({ error: 'User already exists' })
            }

            const { name, email, password, role_id } = await User.create(req.body)
            console.log('teste')
            return res.json({
                name,
                email,
                password,
                role_id,
            })

        } catch (err) {
            res.status(400).json({ error: 'Bad Request' });
        }
    }

    async index(req, res) {
        try {
            const user = await User.findAll()
            return res.status(200).json(user)

        } catch {
            res.status(400).json({ error: 'Bad Request' });
        }
    }

    async update(req, res) {
        try {

            const { id } = req.params
            const user = await User.findByPk(id)

            if (req.body.name && req.body.name !== user.name) {
                const userExistis = await User.findOne({ where: { name: req.body.name } })

                if (userExistis) {
                    return res.status(400).json({ error: 'User already exists' })
                }
            }

            const updateUser = await user.update(req.body)

            res.status(200).json(updateUser)

        } catch {
            res.status(400).json({ error: 'Bad Request' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            const user = await User.findByPk(id)

            const deleteUser = await user.destroy(req.body)

            res.status(200).json(deleteUser)

        } catch {
            res.status(400).json({ error: 'Bad Request' });
        }
    }
}

export default new UserController()