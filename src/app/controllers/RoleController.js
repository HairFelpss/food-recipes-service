import Role from '../models/Role'
import User from '../models/User'

class RoleController {
    async store(req, res) {

        try {
            const roleExists = await Role.findOne({ where: { name: req.body.name } })

            if (roleExists) {
                return res.status(400).json({ error: 'Role already exists' })
            }

            const role = await Role.create(req.body)

            return res.status(200).json(role)

        } catch {
            res.status(400).json({ error: 'Bad Request' });
        }
    }

    async index(req, res) {

        try {
            const roles = await Role.findAll({
                include: [{
                    model: User,
                    as: 'users',
                }]
            })

            return res.status(200).json(roles)

        } catch {
            res.status(400).json({ error: 'Bad Request' });
        }
    }

    async update(req, res) {
        try {

            const { id } = req.params
            const role = await Role.findByPk(id)

            if (req.body.name !== role.name) {

                const typeExistis = await Role.findOne({ where: { name: req.body.name } })

                if (typeExistis) {
                    return res.status(400).json({ error: 'Role already exists' })
                }
            }

            const updateType = await role.update(req.body)

            res.status(200).json(updateType)

        } catch {
            res.status(400).json({ error: 'Bad Request' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            const role = await Role.findByPk(id)

            const deleteType = await role.destroy(req.body)

            res.status(200).json(deleteType)

        } catch {
            res.status(400).json({ error: 'Bad Request' });
        }
    }
}

export default new RoleController()