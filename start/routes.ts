/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'

router.get('/:name', async ({ request, response }: HttpContext) => {
  const { name } = request.params()
  return response.json({
    name: name,
  })
})
