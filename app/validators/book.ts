import vine from '@vinejs/vine'

/**
 * Règle de validation pour la création d'un nouveau Book
 */
export const StoreBookValidator = vine.compile(
  vine.object({
    title: vine.string().maxLength(255),
    description: vine.string(),
    path: vine.string(),
  })
)

/**
 * Règle de validation pour l'update d'un Book
 */
export const UpdateBookValidator = vine.compile(
  vine.object({
    id: vine.number().exists({ table: 'books', column: 'id' }),
    title: vine.string().optional(),
    description: vine.string().optional(),
    path: vine.string().optional(),
  })
)

/**
 * Règle de validation pour la suppression d'un book
 */

// export const DeleteBookValidator = vine.compile(
//     vine.object({
//         id:
//     })
// )
