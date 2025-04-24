import Book from '#models/book'
import { StoreBookValidator, UpdateBookValidator } from '#validators/book'
import type { HttpContext } from '@adonisjs/core/http'
import { updateLucidWithProxy } from '../utilities/functions/update_lucid_object.js'

export default class BooksController {
  async index() {
    return await Book.all()
  }

  async show({ request, response }: HttpContext) {
    const bookId = request.param('bookId', null)

    if (bookId === null) {
      return response.status(404).json({
        messages: 'Book  not found',
      })
    }

    return await Book.findByOrFail(bookId)
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(StoreBookValidator)

    const book = await Book.create(payload)

    return response.status(200).json({
      message: 'Book created',
      book: book,
    })
  }

  async update({ request, response }: HttpContext) {
    const payload = await request.validateUsing(UpdateBookValidator)

    const book: Book = await Book.findOrFail(payload.id)

    updateLucidWithProxy<Book>(book, payload)

    await book.save()

    return response.status(200).json({
      message: 'Book Updated',
      book: book,
    })
  }

  async destroy({ request, response }: HttpContext) {
    const bookId = request.param('bookId', null)

    if (bookId) {
      const book: Book = await Book.findOrFail(bookId)
      book.delete()

      return response.status(201).json({
        message: 'Book deleted',
      })
    }

    return response.status(404).json({
      message: 'Book not found',
    })
  }
}
