import vine from '@vinejs/vine'

export const BookRequestValidator = vine.compile(
    vine.object({
        title:vine.string().trim().minLength(5).maxLength(255),
        description: vine.string().trim().maxLength(800).minLength(10),
        status:vine.enum(['pending','approved','rejected'] as const)
    })
)