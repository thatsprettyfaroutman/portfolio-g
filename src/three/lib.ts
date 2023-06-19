// Helper for getting the loading screen image(s)
export const printImage = (() => {
  let printed = false
  return () => {
    if (printed) {
      return
    }
    printed = true
    setTimeout(() => {
      const canvases = document.body.querySelectorAll('canvas')
      canvases.forEach((c) => {
        const img = document.createElement('img')
        img.src = c.toDataURL()
        document.body.prepend(img)
      })
    }, 1000)
  }
})()
