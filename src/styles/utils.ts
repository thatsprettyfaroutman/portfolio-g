/**
 * Stop props from being passed to the DOM
 */
export const noProp = (props: string[]) => ({
  shouldForwardProp: (prop: string | number) => !props.includes(String(prop)),
})
