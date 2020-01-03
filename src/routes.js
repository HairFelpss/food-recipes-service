import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import RecipesController from './app/controllers/RecipesController'
import FileController from './app/controllers/FileController'

const routes = new Router()
const upload = multer(multerConfig)
// Routes goes here

routes.get('/', RecipesController.store)

routes.post('/files', upload.single('file'), FileController.store)

export default routes