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

export default routes