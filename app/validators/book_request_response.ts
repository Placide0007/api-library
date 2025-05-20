import vine from '@vinejs/vine'

export const BookRequestResponseValidator = vine.compile(
    vine.object({
        message:vine.string().minLength(20).maxLength(8000)
    })
)