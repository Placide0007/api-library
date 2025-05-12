import vine from '@vinejs/vine'

export const StoreSubCategoryValidator = vine.compile(
  vine.object({
    name: vine.string(),
    categoryId: vine.number().exists({ table: 'categories', column: 'id' }),
  })
)

export const UpdateSubCategoryValidator = vine.compile(
  vine.object({
    name: vine.string(),
    categoryId: vine.number().exists({ table: 'categories', column: 'id' }).nullable(),
  })
)
