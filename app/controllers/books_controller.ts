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
    const { title, categoriesId, subCategoriesId, levelsId, description, path } =
      await request.validateUsing(StoreBookValidator)

    const book = await Book.create({
      title,
      description,
      path,
    })

    if (categoriesId) await book.related('categories').attach(categoriesId)
    if (subCategoriesId) await book.related('subCategories').attach(subCategoriesId)
    if (levelsId) await book.related('levels').attach(levelsId)

    return response.status(200).json({
      message: 'Book created',
      book: book,
    })
  }

  async update({ request, response }: HttpContext) {
    const id = request.param('bookId', null)
    const { title, categoriesId, subCategoriesId, levelsId, description, path } =
      await request.validateUsing(UpdateBookValidator)

    const book: Book = await Book.findOrFail(id)

    updateLucidWithProxy<Book>(book, {
      title,
      description,
      path,
    })

    if (categoriesId) await book.related('categories').attach(categoriesId)
    if (subCategoriesId) await book.related('subCategories').attach(subCategoriesId)
    if (levelsId) await book.related('levels').attach(levelsId)

    await book.save()

    return response.status(200).json({
      message: 'Book Updated',
      book: book.refresh(),
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
