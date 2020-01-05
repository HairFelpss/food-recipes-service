import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import UserController from './app/controllers/UserController'
import RecipeController from './app/controllers/RecipeController'
import FileController from './app/controllers/FileController'
import TypeController from './app/controllers/TypeController'
import AvatarController from './app/controllers/AvatarController'
import RoleController from './app/controllers/RoleController'

const routes = new Router()
const upload = multer(multerConfig)
// Routes goes here

routes.post('/users/', UserController.store)
routes.get('/users/', UserController.index)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)

routes.post('/roles/', RoleController.store)
routes.get('/roles/', RoleController.index)
routes.put('/roles/:id', RoleController.update)
routes.delete('/roles/:id', RoleController.delete)

routes.post('/recipes', RecipeController.store)
routes.get('/recipes', RecipeController.index)
routes.put('/recipes/:id', RecipeController.update)
routes.delete('/recipes/:id', RecipeController.delete)

routes.post('/types', TypeController.store)
routes.get('/types', TypeController.index)
routes.put('/types/:id', TypeController.update)
routes.delete('/types/:id', TypeController.delete)

routes.post('/files', upload.single('file'), FileController.store)
routes.get('/files', FileController.index)
routes.put('/files/:id', upload.single('file'), FileController.update)
routes.delete('/files/:id', FileController.delete)

routes.post('/avatar', upload.single('file'), AvatarController.store)
routes.get('/avatar', AvatarController.index)
routes.put('/avatar/:id', upload.single('file'), AvatarController.update)
routes.delete('/avatar/:id', AvatarController.delete)

export default routes