import vine from '@vinejs/vine'

/**
 * Règle de validation pour la création d'un nouveau Book
 */
export const StoreBookValidator = vine.compile(
  vine.object({
    title: vine.string().maxLength(255),
    categoriesId: vine
      .array(vine.number().exists({ table: 'categories', column: 'id' }))
      .nullable(),
    subCategoriesId: vine
      .array(vine.number().exists({ table: 'sub_categories', column: 'id' }))
      .nullable(),
    levelsId: vine.array(vine.number().exists({ table: 'levels', column: 'id' })).nullable(),
    description: vine.string(),
    path: vine.string(),
  })
)

/**
 * Règle de validation pour l'update d'un Book
 */
export const UpdateBookValidator = vine.compile(
  vine.object({
    title: vine.string().optional(),
    categoriesId: vine
      .array(vine.number().exists({ table: 'categories', column: 'id' }))
      .nullable(),
    subCategoriesId: vine
      .array(vine.number().exists({ table: 'sub_categories', column: 'id' }))
      .nullable(),
    levelsId: vine.array(vine.number().exists({ table: 'levels', column: 'id' })).nullable(),
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
