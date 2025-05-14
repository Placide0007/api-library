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
const LevelsController = () => import('#controllers/levels_controller')
import router from '@adonisjs/core/services/router'
import UsersController from '#controllers/users_controller'
import BookRequest from '#models/book_request'


router
  .group(() => {
    router.resource('users', 'users_controller')
  })
  .prefix('/api')


router.group(() => {
  router.resource('users',UsersController ).apiOnly()
  router.resource('bookrequests',BookRequest).apiOnly()
  router.resource('book', BooksController).apiOnly()
  router.resource('category', CategoriesController).apiOnly()
  router.resource('sub_category', SubCategoriesController).apiOnly()
  router.resource('level', LevelsController).apiOnly()
}).prefix('/api')

