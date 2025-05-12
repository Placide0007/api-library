/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const BooksController = () => import('#controllers/books_controller')
import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'

router.get('/:name', async ({ request, response }: HttpContext) => {
  const { name } = request.params()
  return response.json({
    name: name,
  })
})

router
  .group(() => {
    router.resource('users', 'users_controller')
  })
  .prefix('/api')

router.resource('book', BooksController).apiOnly()
