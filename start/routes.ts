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
const SubCategoriesController = () => import('#controllers/sub_categories_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.resource('users', 'users_controller')
  })
  .prefix('/api')

router.resource('book', BooksController).apiOnly()
router.resource('category', CategoriesController).apiOnly()
router.resource('sub_category', SubCategoriesController).apiOnly()
