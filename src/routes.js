import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import RecipeController from './app/controllers/RecipeController'
import FileController from './app/controllers/FileController'
import TypeController from './app/controllers/TypeController'

const routes = new Router()
const upload = multer(multerConfig)
// Routes goes here

routes.post('/recipes', RecipeController.store)
routes.get('/recipes', RecipeController.index)

routes.post('/types', TypeController.store)
routes.get('/types', TypeController.index)

routes.post('/files', upload.single('file'), FileController.store)

export default routes