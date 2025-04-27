import vine from '@vinejs/vine'
/**
 * regle de validation pour l'enregistrement d'un nouvel utilisateur
*/

export const StoreUserValidator = vine.compile(
    vine.object({
        lastname: vine.string().trim().maxLength(200),
        firstname:vine.string().trim().maxLength(200),
        codage:vine.number(),
        password:vine.string().maxLength(255),
        role:vine.enum(['admin','student','professor'] as const)
    })
)