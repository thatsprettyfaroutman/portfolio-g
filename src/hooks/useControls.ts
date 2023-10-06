import { useMemo } from 'react'
import { useControls as useLevaControls } from 'leva'

const SHOW_CONTROLS =
  process.env.NODE_ENV !== 'production' ||
  (typeof window !== undefined && window.location.search.includes('knobs'))

type TValue = string | number | boolean
type TValueWithOptions = { value: TValue } & Record<string, any>
type TSchema = Record<string, TValue | TValueWithOptions>

function isValueWithOptions(value: any): value is TValueWithOptions {
  return typeof value === 'object' && value.hasOwnProperty('value')
}

export function useControls<T extends TSchema>(schema: T) {
  type Keys = keyof T
  type Values = {
    [K in Keys]: T[K] extends TValueWithOptions ? T[K]['value'] : T[K]
  }

  if (SHOW_CONTROLS) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useLevaControls(schema) as Values
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMemo(() => {
    return Object.fromEntries(
      Object.entries(schema).map(([key, item]) => [
        key,
        isValueWithOptions(item) ? item.value : item,
      ])
    )
  }, [schema]) as Values
}
