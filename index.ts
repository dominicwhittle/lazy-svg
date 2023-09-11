export const inline = async (img: HTMLImageElement) =>
  fetch(img.src)
    .then((req) => req.text())
    .then((str) => {
      const svg = new DOMParser()
        .parseFromString(str, "text/html")
        .querySelector("svg") as SVGSVGElement
      img.replaceWith(svg)
      return svg
    })

export const onload = async (img: HTMLImageElement) =>
  new Promise((resolve) => {
    img.onload = async () => {
      const svg = await inline(img)
      resolve(svg)
    }
    img.src = img.src
  })
