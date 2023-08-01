export type DeepReplace<T, From, To> = T extends (...args: any[]) => any
  ? T
  : {
      [K in keyof T]: [T[K], From] extends [From, T[K]]
        ? To
        : DeepReplace<T[K], From, To>
    }
