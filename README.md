# lazy-svg — Lazy loading inline SVG

This small snippet of JavaScript lets you load SVG via img tags, leverage browser native lazy loading (and the look ahead parser), and automatically inlines them into the document once loaded.

Please note the [CORS caveat](#cors-and-cdns).

## Loading the script

If you want to use this in the most simple way, inline it in the `<head>`. Literally just copy-paste from below.

```html
<head>
  <!-- Head stuff -->
  <script>/* https://github.com/dominicwhittle/lazy-svg v1.0.0 */ (()=>{var r=async n=>fetch(n.src).then(e=>e.text()).then(e=>{let t=new DOMParser().parseFromString(e,"text/html").querySelector("svg");return n.replaceWith(t),t});window.inlineSVG=r;})();
</script>
</head>
```

Alternatively, import it into your Typescript project via npm.

```bash
npm install git@github.com:dominicwhittle/lazy-svg.git
```

I recommend adding the specific commit hash to the end to pin the version in your `package.json`.

```bash
npm install git@github.com:dominicwhittle/lazy-svg.git#commit
```

## Usage

Reference your SVG in an image tag and call the function in the onload attribute event. For basic usage that's all you need.

```html
<img
  src="example.svg"
  onload="inlineSVG(this)"
  loading="lazy"
  width="800"
  height="600"
/>
```

If you want to do something after the svg has been loaded and inlined into the document (like add a CSS class), use the promise returned by the inline function which returns the inlined svg element.

```html
onload="inlineSVG(this).then(svg => { svg.classList.add("my-svg"); svg.addAttribute("aria-role", "presentation") })"
```

## Advanced usage

To use via another script, and still respect browser `loading=lazy` hueristics, import the `onload` function.

In this example, perhaps you want to animate your svg paths once the svg has been loaded and inlined:

```typescript
import { onload } from "lazy-svg"

const img = document.querySelector("img.svg-placeholder")
if (img) {
  onload(img).then((svg: SVGSVGElement) => {
    // Animate the SVG paths or whatever, eg
    // const paths = svg.querySelectorAll("path")
}
```

If you want to inline the svg ASAP, swap `onload` for `inline` in the above. This immediately fetches and inlines the svg. You lose the benefit of lazy loading, but there may be times you want that. You do you, man.

If you haven't added the script to the `<head>` you can import the `inline` and `onload` functions into your typescript instead of assuming the window var is available.

## Caveats

### CORS and CDNs

SVG has some historic cross-origin requirements. This likely won't work for you out of the box if you're using a CDN (or trying to fetch an SVG from any different domain) without first setting up cross-origin headers and appropriate permissions on your server.

The supplementary information [Understanding CORS and SVG](https://oreillymedia.github.io/Using_SVG/extras/ch10-cors.html) from the book *Using SVG with CSS3 and HTML5* by Amelia Bellamy-Royds, Kurt Cagle, and Dudley Storey provides a useful background.
