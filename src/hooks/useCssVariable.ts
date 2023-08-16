import { useEffect, useState } from 'react'

// This div is used to get computed px value of css variable
const getMeasureDiv = (varName: string): HTMLDivElement => {
  const id = `measureDiv${varName}`
  const div = document.body.querySelector(`.${id}`)
  if (div) {
    return div as HTMLDivElement
  }
  const newDiv = document.createElement('div')
  newDiv.className = id
  newDiv.style.position = 'absolute'
  newDiv.style.top = '-9999px'
  newDiv.style.left = '-9999px'
  newDiv.style.width = `var(${varName})`
  newDiv.style.height = '1px'
  document.body.prepend(newDiv)
  return newDiv
}

const getCssVariableValue = (varName: string) => {
  const div = getMeasureDiv(varName)
  return div.offsetWidth
}

/**
 *
 * @param varName only numeral value css variable is supported
 * @returns css variable value in px
 */
export default function useCssVariable(varName: string) {
  const [value, setValue] = useState(getCssVariableValue(varName))

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      setValue(getCssVariableValue(varName))
    })
    observer.observe(document.body)

    return () => {
      observer.disconnect()
    }
  }, [varName])

  return value
}
