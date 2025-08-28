export type ExtractNestedValues<T extends object> = {
  [K in keyof T]: T[K] extends object ? ExtractNestedValues<T[K]> : T[K]
}[keyof T]
