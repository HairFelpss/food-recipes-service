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
            return res.json(role)

        } catch (err) {
            console.log('err => ', err)
        }
    }

    async index(req, res) {

        try {
            const roles = await Role.findAll({
                include: [
                    {
                        model: User,
                        as: 'users',
                        attributes: ['id', 'name', 'email']
                    }
                ]
            })

            const { id, name, users } = roles[0]
            const filteredRoles = { id, name, users }
            return res.json(filteredRoles)

        } catch (err) {
            console.log('err => ', err)
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params

            if (req.body.name !== role.name) {

                const typeExistis = await Role.findOne({ where: { name: req.body.name } })

                if (typeExistis) {
                    return res.status(400).json({ error: 'Role already exists' })
                }
            }

            const role = await Role.findByPk(id)
            const updateType = await role.update(req.body)

            res.json(updateType)

        } catch (err) {
            console.log('err => ', err)
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            const role = await Role.findByPk(id)

            const deleteType = await role.destroy(req.body)

            res.json(deleteType)

        } catch (err) {
            console.log('err => ', err)
        }
    }
}

export default new RoleController()