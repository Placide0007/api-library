/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const BooksController = () => import('#controllers/books_controller')
const CategoriesController = () => import('#controllers/categories_controller')
import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.resource('users', 'users_controller')
  })
  .prefix('/api')

router.resource('book', BooksController).apiOnly()
router.resource('category', CategoriesController).apiOnly()
