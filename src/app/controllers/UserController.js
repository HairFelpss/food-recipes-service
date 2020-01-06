import * as Yup from 'yup'
import User from '../models/User'
import Avatar from '../models/Avatar'

class UserController {
  async store(req, res) {
    try {

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(8),
        role_id: Yup.number()
      })

      if(!(await schema.isValid(req.body))){
        return res.status(400).json({ error: 'Validation fails'})
      }

      const userExists = await User.findOne({ where: { email: req.body.email } })

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' })
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
      const user = await User.findAll({
        attributes: ['id', 'name', 'email', 'avatar_id'],
        include: {
          model: Avatar,
          as: 'avatar',
          attributes: ['name', 'path', 'url']
        }
      })
      return res.json(user)

    } catch (err) {
      console.log('err => ', err)
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        oldPassword: Yup.string().min(10),
        password: Yup.string().min(10).when('oldPassword', (oldPassword, field) => 
          oldPassword ? field.required() : field
        ),
        confirmPassword: Yup.string().when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
        role_id: Yup.number()
      })

      if(!(await schema.isValid(req.body))){
        return res.status(400).json({ error: 'Validation fails'})
      }

      const { email, oldPassword } = req.body
      const id = req.userId

      const user = await User.findByPk(id)

      if (email && email !== user.email) {
        const userExists = await User.findOne({ where: { email: req.body.email } })

        if (userExists) {
          return res.status(400).json({ error: 'User already exists' })
        }
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        res.status(401).json({ error: 'Password does not match ' })
      }

      const { name, password, role_id } = await user.update(req.body)

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