import type { HttpContext } from '@adonisjs/core/http'

import SubCategory from '#models/sub_category'
import { StoreSubCategoryValidator } from '#validators/sub_category'

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
    const { name } = await request.validateUsing(StoreSubCategoryValidator)

    const subCategory = SubCategory.create({
      name: name,
    })

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

    subCategory.delete()

    return response.status(201).json({
      message: 'SubCategory deleted',
    })
  }

  async update({ request, response }: HttpContext) {
    const id = request.param('subCategoryId', null)
    const { name } = await request.validateUsing(StoreSubCategoryValidator)

    if (id === null) {
      return response.status(404).json({
        message: 'SubCategory not found',
      })
    }

    const subCategory = await SubCategory.findOrFail(id)

    subCategory.name = name

    await subCategory.save()

    return response.status(200).json({
      message: 'SubCategory Updated',
      subCategory: await subCategory.refresh(),
    })
  }
}
