# Viljami.dev Portfolio

This is the source code for my portfolio site viljami.dev. It's built with Next.js, Typescript, and React. There are also 3D elements written with @react-three/fiber and three.js. Content is managed with Contentful.

![viljami dev demo25-15](https://github.com/thatsprettyfaroutman/portfolio-g/assets/6589190/e35e28c9-814f-4dd3-8af7-25a82f1f4e68)

### Setup
Create a `.env.local` file. (You'll need to setup Contentful first)
```
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
```


### Structure

|Dir|Description|
|:----------|:-------------|
|`app`|Next.js app dir|
|`asyncComponents`|This dir contains components that fetch data from Contentful at build time|
|`components`|React components|
|`contentful`|Contentful related data fetching logic and types are found here|
|`hooks`|Utility React-hooks|
|`styles`|CSS/Style-related configs and utils are here, as well as Global styles and theme colors|
|`three`|Everything `three.js` and `@react-three/fiber` related is in this dir|
|`types`|Global Typescript declarations|

### Component Structure

Example code:
```jsx
// Imports
import dynamic from 'next/dynamic'
import styled from 'styled-components'

// Dynamic imports
const ThreeScene = dynamic(() => import('@/three/scene'), { ssr: false )

// Consts
const SOME_CONST = 'hello'

// Types
type TComponentNameProps = {}

// Styles
const Wrapper = styled.div``

export default function ComponentName({...restProps}:TComponentNameProps) {

  // Logic

  // Pass `restProps`, for flexibility. This way its easier to extend component styles with Styled etc...
  return (
    <Wrapper {...restProps} />
  )
}
```

Sections can be moved to a separate file if needed,
| Name | Description |
|:--------|:-----|
| Components | `./components/` - All sub-components go in this dir |
| Consts | `./consts.ts` |
| Types | `./types.ts` |
| Styles | `./styled.ts` |
| Logic | `./hooks/useComponentName.ts` - All component related hooks go in `./hooks` dir|

Other notes:
| Name | Description |
|:--------|:-----|
| Lazy loading | `./lazy.ts` file can be created to make it easier to import component dynamically like this `import Three from '@/three/lazy`|
| Context| `./context.ts` To avoid prop-drilling, a context file can be created with `constate` |












