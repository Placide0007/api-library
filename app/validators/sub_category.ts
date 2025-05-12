import vine from '@vinejs/vine'

export const StoreSubCategoryValidator = vine.compile(
  vine.object({
    name: vine.string(),
  })
)
