import User from '../models/User'
import Role from '../models/Role'

class UserController {
  async store(req, res) {
    try {

      const userExists = await User.findOne({ where: { email: req.body.email }})

      if(userExists){
        return res.status(400).json({error: 'User already exists'})
      }

      const { name, email, password, role_id } = await User.create(req.body)

      return res.json({
        name,
        email,
        password,
        role_id,
      })

    } catch (err) {
      console.log('err => ', err)
    }
  }

  async index(req, res) {
    try {
      const user = await User.findAll()
      return res.json(user)

    } catch (err) {
      console.log('err => ', err)
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

      res.json(updateUser)

    } catch (err) {
      console.log('err => ', err)
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      const user = await User.findByPk(id)

      const deleteUser = await user.destroy(req.body)

      res.json(deleteUser)

    } catch (err) {
      console.log('err => ', err)

      res.json(err)
    }
  }
}

export default new UserController()