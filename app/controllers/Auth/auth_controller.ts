import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { LoginUserValidator } from '#validators/login_user'

export default class AuthController {
    async login({ request, response }: HttpContext) {
        const { password, username } = await request.validateUsing(LoginUserValidator)
        const user = await User.verifyCredentials(username, password)
        const token = await User.accessTokens.create(user)
        return response.status(200).json({
            token: token,
            user: user
        })
    }
}
