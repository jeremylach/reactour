import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import filesize from 'rollup-plugin-filesize'
import pkg from './package.json'
import generatePackageJson from 'rollup-plugin-generate-package-json'

export default {
  input: 'src/index.js',
  external: [
    ...Object.keys(pkg.peerDependencies),
    ...Object.keys(pkg.dependencies),
  ],
  plugins: [
    resolve(),
    babel({
      exclude: ['node_modules/**'],
    }),
    filesize(),
    generatePackageJson({
      baseContents: (pkg) => ({
        ...pkg,
        main: './reactour.cjs.js',
      })
    }),
  ],
  output: [
    { file: pkg.main, format: 'cjs', exports: 'named' },
  ],
}
