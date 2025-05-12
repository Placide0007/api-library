import Category from '#models/category'
import { StoreCategoryValidator, UpdateCategoryValidator } from '#validators/categorie'
import type { HttpContext } from '@adonisjs/core/http'
import { updateLucidWithProxy } from '../utilities/functions/update_lucid_object.js'
import { messages } from '@vinejs/vine/defaults'

export default class CategoriesController {
  async index() {
    return await Category.all()
  }

  async store({ request, response }: HttpContext) {
    const { name } = await request.validateUsing(StoreCategoryValidator)
    const category = await Category.create({
      name: name,
    })
    return response.status(200).json({
      message: 'Category created',
      category: category,
    })
  }

  async show({ request, response }: HttpContext) {
    const id = request.param('id', null)

    if (id === null) {
      return response.status(404).json({
        message: 'Category not found',
      })
    }

    let category: Category
    try {
      category = await Category.findOrFail(id)
    } catch (e) {
      return response.status(404).json({
        message: 'Category not found',
      })
    }

    return response.status(200).json({
      category,
      books: await category.related('books').query().select('*'),
    })
  }

  async destroy({ request, response }: HttpContext) {
    const id = request.param('id', null)

    if (id === null) {
      return response.status(404).json({
        message: 'Category not found',
      })
    }

    let category: Category
    try {
      category = await Category.findOrFail(id)
    } catch (e) {
      return response.status(404).json({
        messages: 'Category not found',
      })
    }

    category.related('books').detach()
    category.delete()

    return response.status(201).json({
      message: 'Category deleted',
    })
  }

  async update({ request, response }: HttpContext) {
    const id = request.param('id', null)
    const { name } = await request.validateUsing(UpdateCategoryValidator)

    if (id === null) {
      return response.status(404).json({
        message: 'Category not found',
      })
    }

    let category: Category

    try {
      category = await Category.findOrFail(id)
    } catch (e) {
      return response.status(404).json({
        message: 'Category not found',
      })
    }

    updateLucidWithProxy(category, { name })

    await category.save()

    return response.status(201).json({
      message: 'Category Updated',
      category: await category.refresh(),
    })
  }
}
