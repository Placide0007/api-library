import type { HttpContext } from '@adonisjs/core/http'

import Level from '#models/level'
import { StoreLevelValidator } from '#validators/level'

export default class LevelsController {
  async index() {
    return await Level.all()
  }

  async show({ request, response }: HttpContext) {
    const id = request.param('levelId', null)

    if (id === null) {
      return response.status(404).json({
        message: 'Level not found',
      })
    }

    return await Level.findOrFail(id)
  }

  async store({ request, response }: HttpContext) {
    const { name } = await request.validateUsing(StoreLevelValidator)

    const level = await Level.create({
      name: name,
    })

    return response.status(200).json({
      message: 'Level created',
      level: level,
    })
  }

  async update({ request, response }: HttpContext) {
    const id = request.param('levelId', null)
    const { name } = await request.validateUsing(StoreLevelValidator)

    if (id === null) {
      return response.status(404).json({
        message: 'Level not found',
      })
    }

    const level = await Level.findOrFail(id)

    level.name = name

    await level.save()

    return response.status(200).json({
      message: 'Level updated',
      level: level,
    })
  }

  async destroy({ request, response }: HttpContext) {
    const id = request.param('levelId', null)

    if (id === null) {
      return response.status(404).json({
        message: 'Level not found',
      })
    }

    const level = await Level.findOrFail(id)

    await level.delete()

    return response.status(201).json({
      message: 'Level deleted',
    })
  }
}
