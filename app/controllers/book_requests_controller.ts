import BookRequest from '#models/book_request'
import { BookRequestValidator } from '#validators/bookrequest';
import type { HttpContext } from '@adonisjs/core/http'

export default class BookRequestsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const bookRequests = await BookRequest.all()
    return response.status(200).json({
      messages: 'Liste des demandes recuperés avec succès',
      bookRequests: bookRequests
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(BookRequestValidator);
    const bookRequest = await BookRequest.create(payload);
    try {
      return response.status(200).json({
        message: 'Demande cree avec succee',
        bookRequest: bookRequest,
      })
    } catch {
      return response.status(404).json({ message: 'Erreur de creation de demande'})
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const bookRequest = await BookRequest.findByOrFail(params.id)
    try {
      return response.status(200).json(bookRequest)
    } catch {
      return response.status(404).json({ 
        message: 'Demande  non trouvé' 
      })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const bookRequest = await BookRequest.findOrFail(params.id)
    const data = request.only(['title', 'description'])
    bookRequest.merge(data)
    await bookRequest.save()
    return response.status(200).json({
      messages: 'Demande modifier avec succèes'
    })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const bookRequest = await BookRequest.findByOrFail(params.id)
    await bookRequest.delete()
    return response.status(200).json({
      message: 'Demande supprimer avec succès'
    })
  }
}