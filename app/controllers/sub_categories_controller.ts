import type { HttpContext } from '@adonisjs/core/http'

import SubCategory from '#models/sub_category'
import { StoreSubCategoryValidator, UpdateSubCategoryValidator } from '#validators/sub_category'
import Category from '#models/category'

export default class SubCategoriesController {
  async index() {
    return await SubCategory.all()
  }

  async show({ request, response }: HttpContext) {
    const id = request.param('subCategoryId', null)

    if (id === null) {
      return response.status(404).json({
        message: 'SubCategory not found',
      })
    }

    return await SubCategory.findOrFail(id)
  }

  async store({ request, response }: HttpContext) {
    const { name, categoryId } = await request.validateUsing(StoreSubCategoryValidator)

    const subCategory = await SubCategory.create({
      name: name,
    })

    await subCategory.related('category').associate((await Category.find(categoryId)) as Category)

    subCategory.save()

    return response.status(200).json({
      message: 'SubCategory Created',
      subCategory: subCategory,
    })
  }

  async destroy({ request, response }: HttpContext) {
    const id = request.param('subCategoryId', null)

    if (id === null) {
      return response.status(404).json({
        message: 'SubCategory not found',
      })
    }

    const subCategory = await SubCategory.findOrFail(id)

    subCategory.related('books').detach()
    subCategory.delete()

    return response.status(201).json({
      message: 'SubCategory deleted',
    })
  }

  async update({ request, response }: HttpContext) {
    const id = request.param('subCategoryId', null)
    const { name, categoryId } = await request.validateUsing(UpdateSubCategoryValidator)

    if (id === null) {
      return response.status(404).json({
        message: 'SubCategory not found',
      })
    }

    const subCategory = await SubCategory.findOrFail(id)

    subCategory.name = name

    if (categoryId)
      await subCategory.related('category').associate((await Category.find(categoryId)) as Category)

    await subCategory.save()

    return response.status(200).json({
      message: 'SubCategory Updated',
      subCategory: await subCategory.refresh(),
    })
  }
}
