import BookRequestResponse from '#models/book_request_response'
import { BookRequestResponseValidator } from '#validators/book_request_response';
import type { HttpContext } from '@adonisjs/core/http'

export default class BookRequestResponsesController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const bookRequestResponses = await BookRequestResponse.all()
    return response.status(200).json({
      messages: 'Liste des reponses recuperés avec succès',
      bookRequestResponses: bookRequestResponses
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(BookRequestResponseValidator);
    const bookRequestResponse = await BookRequestResponse.create(payload);
    try {
      return response.status(200).json({
        message: 'Reponse cree avec succee',
        bookRequestResponse: bookRequestResponse,
      })
    } catch {
      return response.status(404).json({ message: 'Erreur de soumission de reponse' })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const bookRequestResponse = await BookRequestResponse.findByOrFail(params.id)
    try {
      return response.status(200).json(bookRequestResponse)
    } catch {
      return response.status(404).json({
        message: 'Reponse  non trouvé'
      })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request , response }: HttpContext) {
    const bookRequestResponses = await BookRequestResponse.findOrFail(params.id)
    const data = request.all()
    bookRequestResponses.merge(data)
    await bookRequestResponses.save()
    return response.status(200).json({
      messages: 'Reponse modifier avec succèes'
    })
  }

  /**
   * Delete record
   */
  async destroy({ params , response }: HttpContext) {
    const bookRequestResponse = await BookRequestResponse.findByOrFail(params.id)
        await bookRequestResponse.delete()
        return response.status(200).json({
          message: 'Reponse supprimé avec succès'
        })
  }
}