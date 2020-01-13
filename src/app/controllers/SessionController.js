import jwt from 'jsonwebtoken'
import * as Yup from 'yup'

import authConfig from '../../config/auth'

import User from '../models/User'
import Role from '../models/Role'
import Avatar from '../models/Avatar'


class SessionController {
  async store(req, res) {

    try {

      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      })

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' })
      }

      const { email, password } = req.body

      const user = await User.findOne({
        where: { email },
        include: [{
          model: Avatar,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        }]
      })
      if (!user) {
        return res.status(401).json({ error: 'User not found' })
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ error: 'Password does not match ' })
      }

      const { id, name, role_id, avatar } = user
      const role = role_id ? await Role.findOne({ where: { id: role_id } }) : null
      const role_name = role ? role.name : 'user'

      return res.json({
        user: {
          id,
          name,
          email,
          role_name,
          role_id,
          avatar
        },
        token: jwt.sign({ id, role_name }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        })
      })
    } catch (err) {
      console.log('err => ', err)
    }
  }
}

export default new SessionController() 