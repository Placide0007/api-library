import Book from '#models/book'
import { StoreBookValidator, UpdateBookValidator } from '#validators/book'
import type { HttpContext } from '@adonisjs/core/http'
import { updateLucidWithProxy } from '../utilities/functions/update_lucid_object.js'
import { afterDelete } from '@adonisjs/lucid/orm'

export default class BooksController {
  async index() {
    return await Book.all()
  }

  async show({ request, response }: HttpContext) {
    const bookId = request.param('id', null)

    if (bookId === null) {
      return response.status(404).json({
        messages: 'Book  not found',
      })
    }
    try {
      return await Book.findOrFail(bookId)
    } catch (e) {
      return response.status(404).json({
        message: 'Book not found',
      })
    }
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

    await book.save()

    return response.status(200).json({
      message: 'Book created',
      book: await book.refresh(),
    })
  }

  async update({ request, response }: HttpContext) {
    const id = request.param('id', null)

    const { title, categoriesId, subCategoriesId, levelsId, description, path } =
      await request.validateUsing(UpdateBookValidator)

    let book: Book
    try {
      book = await Book.findOrFail(id)
    } catch (e) {
      return response.status(404).json({
        message: 'Book not found',
      })
    }

    updateLucidWithProxy<Book>(book, {
      title,
      description,
      path,
    })

    const alreadyLinkedCategories: Number[] = await book
      .related('categories')
      .query()
      .select('id')
      .then((data) => data.flatMap((cat) => cat.id as number))

    const alreadyLinkedSubCategories: Number[] = await book
      .related('categories')
      .query()
      .select('id')
      .then((data) => data.flatMap((cat) => cat.id as number))

    const alreadyLinkedLevels: Number[] = await book
      .related('categories')
      .query()
      .select('id')
      .then((data) => data.flatMap((cat) => cat.id as number))

    if (categoriesId) {
      await book
        .related('categories')
        .attach(categoriesId.filter((catId) => !alreadyLinkedCategories.includes(catId)))
    }
    if (subCategoriesId) {
      await book
        .related('subCategories')
        .attach(
          subCategoriesId.filter((subCatId) => !alreadyLinkedSubCategories.includes(subCatId))
        )
    }
    if (levelsId) {
      await book
        .related('levels')
        .attach(levelsId.filter((levId) => !alreadyLinkedLevels.includes(levId)))
    }
    await book.save()

    return response.status(200).json({
      message: 'Book Updated',
      book: await book.refresh(),
    })
  }

  async destroy({ request, response }: HttpContext) {
    const bookId = request.param('id', null)

    if (bookId) {
      try {
        const book: Book = await Book.findOrFail(bookId)
        book.delete()
        return response.status(201).json({
          message: 'Book deleted',
        })
      } catch (e) {
        return response.status(404).json({
          message: 'Book not found',
        })
      }
    }

    return response.status(404).json({
      message: 'Book not found',
    })
  }
}
