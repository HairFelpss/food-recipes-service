import Sequelize from 'sequelize'

import User from '../app/models/User'
import File from '../app/models/File'
import Recipe from '../app/models/Recipe'
import Type from '../app/models/Type'
import Avatar from '../app/models/Avatar'
import Role from '../app/models/Role'
import databaseConfig from '../config/database'

const models = [User, File, Recipe, Type, Avatar, Role]

class Database {
    constructor() {
        this.init()
    }

    init() {
        this.connection = new Sequelize(databaseConfig)
        models.map(model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models))
    }
}

export default new Database()