import { buildSync } from "esbuild"

const result = buildSync({
  entryPoints: ['./browser.ts'],
  bundle: true,
  minify: true,
  target: ["chrome58", "firefox57", "safari11", "edge79"],
  outdir: './build',
  // write: false,
})

  // const { text } = result.outputFiles[0]
  // const hash = shorthash(text)
  // const basename = path.basename(entry, path.extname(entry))
  // const hashedBasename = `${basename}.${hash}.js`

  // // Add to assets/public manifest
  // const asset = setAsset(entry, hashedBasename)

  // // Write file to assets/public
  // mkdirSync(path.dirname(asset.path), { recursive: true })
  // writeFileSync(asset.path, text)
