declare module 'math-random-seed' {
  export default function seed(seedValue?:string) {
    return function random(): number
  }
}

declare module 'lerp' {
  export default function lerp(x:number,y:number,a:number ):number
}