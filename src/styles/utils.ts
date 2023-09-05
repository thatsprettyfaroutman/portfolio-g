export const noProp = (props: string[]) => ({
  shouldForwardProp: (prop: string | number) => !props.includes(String(prop)),
})
