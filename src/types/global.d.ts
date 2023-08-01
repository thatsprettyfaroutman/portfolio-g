declare module 'math-random-seed' {
  export default function seed(seedValue?:string) {
    return function random(): number
  }
}