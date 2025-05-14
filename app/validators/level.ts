import vine from '@vinejs/vine'

export const StoreLevelValidator = vine.compile(
  vine.object({
    name: vine.string(),
  })
)
