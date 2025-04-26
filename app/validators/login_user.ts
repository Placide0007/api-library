import vine from '@vinejs/vine'
/**
 * regle de validation pour l'authentification  d'un nouvel utilisateur
*/

export const LoginUserValidator = vine.compile(
    vine.object({
        username: vine.string().trim().maxLength(200),
        password:vine.string().maxLength(255),
    })
)