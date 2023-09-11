# lazy-svg — Lazy loading inline SVG

```html
<script>/* https://github.com/dominicwhittle/lazy-svg v1.0.0 */ (()=>{var s=async e=>fetch(e.src).then(t=>t.text()).then(t=>{let n=new DOMParser().parseFromString(t,"text/html").querySelector("svg");return e.replaceWith(n),n}),r=async e=>new Promise(t=>{e.onload=async()=>{let n=await s(e);t(n)},e.src=e.src});})();</script>
```
