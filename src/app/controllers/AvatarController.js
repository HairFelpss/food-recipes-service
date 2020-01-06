import Avatar from '../models/Avatar'

class AvatarController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file

    try {
      const avatar = await Avatar.create({
        name,
        path,
      })

      res.json(avatar)
    } catch (err) {
      console.log('err => ', err)
    }
  }

  async index(req, res) {
    try {
      const files = await Avatar.findAll()
      return res.json(files)

    } catch (err) {
      console.log('err => ', err)
    }
  }

  async update(req, res) {
    try {
     const id = req.userId
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

      res.json(updateAvatar)

    } catch (err) {
      console.log('err => ', err)
    }
  }

  async delete(req, res) {
    try {
     const id = req.userId
      const avatar = await Avatar.findByPk(id)

      const deleteAvatar = await avatar.destroy(req.body)

      res.json(deleteAvatar)

    } catch (err) {
      console.log('err => ', err)
    }
  }
}

export default new AvatarController()