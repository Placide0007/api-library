export function updateLucidWithProxy<T extends object>(
  obj: T,
  payload: Partial<Record<keyof T, string | number | null | undefined>>
) {
  const handler = {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    set(obj: T, prop: string, value: string | number | null | undefined) {
      if (value !== null && value !== undefined) {
        return Reflect.set(obj, prop, value)
      }

      return false
    },
  }
  const objProxy = new Proxy(obj, handler)

  for (const [key, value] of Object.entries(payload)) {
    Reflect.set(objProxy, key, value)
  }
}
