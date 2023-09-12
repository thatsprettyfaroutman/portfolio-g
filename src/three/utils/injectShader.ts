import { type Shader } from 'three'

type TInjectCodeTemplate = (
  codeStrings: TemplateStringsArray,
  ...interpolations: string[]
) => string

const createInjectShader = (
  shader: Shader,
  shaderName: 'vertexShader' | 'fragmentShader'
) =>
  ((position: string, code?: string) => {
    const inject: TInjectCodeTemplate = (codeStrings, ...interpolations) => {
      const codeArr = [position, codeStrings[0]]
      for (let i = 0, len = interpolations.length; i < len; i++) {
        codeArr.push(interpolations[i], codeStrings[i + 1])
      }
      shader[shaderName] = shader[shaderName].replace(
        position,
        codeArr.join('\n')
      )
      return shader[shaderName]
    }

    if (code) {
      return inject`${code}`
    }

    return inject
  }) as {
    // Overload
    (position: string, code?: undefined): TInjectCodeTemplate
    (position: string, code: string): string
  }

/**
 * This is a helper for injecting shader code into existing THREE shaders.
 */
const getShaderInjectors = (shader: Shader) => {
  const vertex = createInjectShader(shader, 'vertexShader')
  const fragment = createInjectShader(shader, 'fragmentShader')
  return { vertex, fragment }
}

export default getShaderInjectors
