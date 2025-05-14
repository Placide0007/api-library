import type { HttpContext } from '@adonisjs/core/http'
import { StoreUserValidator } from '#validators/store_user_validator'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'


export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const users = await User.all()
    return response.status(200).json({
      messages:'utilisateurs recuperés avec succès',
      'users': users
    })
  }

  /**
 * Handle form submission for the create action
 */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(StoreUserValidator)
    payload.password = await hash.make(payload.password)
    const user = await User.create(payload)
    return response.status(200).json({
      message : 'utilisateur cree avec succès',
      user:user,
    })
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const user = await User.findByOrFail(params.username)
    try {
      return response.status(200).json(user)
    } catch {
      return response.status(404).json({ message: 'utilisateur non trouvé' })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params , request , response}: HttpContext) {
    const user = await User.findOrFail(params.username)
    const data = request.only(['firstname','lastname','role'])
    user.merge(data)
    await user.save()
    return response.status(200).json({
      messages:'informations modifiées avec succèes'
    })
  }

  /**
   * Delete record
   */
  async destroy({ params , response }: HttpContext) {
    const user = await User.findByOrFail(params.username)
    await user.delete()
    return response.status(200).json({
      message:'utilisateur supprimer avec succès'
    })
  }
}


