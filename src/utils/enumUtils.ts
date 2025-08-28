export function parseEnum<E, K extends string>(
  enumDef: { [key in K]: E },
  str: string | undefined,
): E | undefined {
  if (str && str in enumDef) {
    return enumDef[str as K] as E
  }
  return undefined
}

export function enumToList<T = number>(e: any): { value: T; label: string }[] {
  return Object.entries(e)
    .filter((e) => isNaN(e[0] as any))
    .map((e) => ({ value: e[1] as T, label: e[0] as string }))
}
