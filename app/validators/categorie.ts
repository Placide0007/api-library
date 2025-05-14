import vine from '@vinejs/vine'

/**
 * Règle de validation pour la création de catégorie
 */
export const StoreCategoryValidator = vine.compile(
  vine.object({
    name: vine.string(),
  })
)

/**
 * Règle de validation pour l'update de catégorie
 */

export const UpdateCategoryValidator = vine.compile(
  vine.object({
    name: vine.string(),
  })
)
