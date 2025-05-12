import Category from '#models/category'
import { StoreCategoryValidator, UpdateCategoryValidator } from '#validators/categorie'
import type { HttpContext } from '@adonisjs/core/http'
import { updateLucidWithProxy } from '../utilities/functions/update_lucid_object.js'

export default class CategoriesController {
  async index() {
    return await Category.all()
  }

  async store({ request, response }: HttpContext) {
    const { name } = await request.validateUsing(StoreCategoryValidator)
    const category = Category.create({
      name: name,
    })
    return response.status(200).json({
      message: 'Category created',
      category: category,
    })
  }

  async show({ request, response }: HttpContext) {
    const id = request.param('categoryId', null)

    if (id === null) {
      return response.status(404).json({
        message: 'Category not found',
      })
    }

    const category = await Category.findOrFail(id)
    return response.status(200).json({
      category,
      books: category.books.values(),
    })
  }

  async destroy({ request, response }: HttpContext) {
    const id = request.param('categoryId', null)

    if (id === null) {
      return response.status(404).json({
        message: 'Category not found',
      })
    }

    const category = await Category.findOrFail(id)

    category.related('books').detach()
    category.delete()

    return response.status(201).json({
      message: 'Category deleted',
    })
  }

  async update({ request, response }: HttpContext) {
    const id = request.param('categoryId', null)
    const { name } = await request.validateUsing(UpdateCategoryValidator)

    if (id === null) {
      return response.status(404).json({
        message: 'Category not found',
      })
    }

    const category = await Category.findOrFail(id)

    updateLucidWithProxy(category, { name })

    await category.save()

    return response.status(201).json({
      message: 'Category Updated',
      category: await category.refresh(),
    })
  }
}
