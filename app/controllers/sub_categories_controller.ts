import type { HttpContext } from '@adonisjs/core/http'

import SubCategory from '#models/sub_category'
import { StoreSubCategoryValidator, UpdateSubCategoryValidator } from '#validators/sub_category'
import Category from '#models/category'

export default class SubCategoriesController {
  async index() {
    return await SubCategory.all()
  }

  async show({ request, response }: HttpContext) {
    const id = request.param('id', null)

    if (id === null) {
      return response.status(404).json({
        message: 'SubCategory not found',
      })
    }

    let subCategory: SubCategory
    try {
      subCategory = await SubCategory.findOrFail(id)
    } catch (e) {
      return response.status(404).json({
        message: 'SubCategory not found',
      })
    }

    return response.status(200).json({
      subCategory,
      books: await subCategory.related('books').query().select('*'),
    })
  }

  async store({ request, response }: HttpContext) {
    const { name, categoryId } = await request.validateUsing(StoreSubCategoryValidator)

    let category: Category
    try {
      category = await Category.findOrFail(categoryId)
    } catch (e) {
      return response.status(422).json({
        message: 'Bad request, invalid CategoryId',
      })
    }

    const subCategory = await category.related('subCategories').create({
      name,
    })

    return response.status(200).json({
      message: 'SubCategory Created',
      subCategory: subCategory,
    })
  }

  async destroy({ request, response }: HttpContext) {
    const id = request.param('id', null)

    if (id === null) {
      return response.status(404).json({
        message: 'SubCategory not found',
      })
    }

    let subCategory: SubCategory
    try {
      subCategory = await SubCategory.findOrFail(id)
    } catch (e) {
      return response.status(404).json({
        message: 'SubCategory not found',
      })
    }

    subCategory.related('books').detach()
    subCategory.delete()

    return response.status(201).json({
      message: 'SubCategory deleted',
    })
  }

  async update({ request, response }: HttpContext) {
    const id = request.param('id', null)
    const { name, categoryId } = await request.validateUsing(UpdateSubCategoryValidator)

    if (name === undefined && categoryId === undefined) return response.status(201).json({})

    if (id === null) {
      return response.status(404).json({
        message: 'SubCategory not found',
      })
    }

    let subCategory: SubCategory
    try {
      subCategory = await SubCategory.findOrFail(id)
    } catch (e) {
      return response.status(404).json({
        message: 'SubCategory not found',
      })
    }

    if (name) {
      subCategory.name = name
    }

    if (categoryId)
      await subCategory.related('category').associate((await Category.find(categoryId)) as Category)

    await subCategory.save()

    return response.status(200).json({
      message: 'SubCategory Updated',
      subCategory: await subCategory.refresh(),
    })
  }
}
