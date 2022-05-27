import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import livereload from "rollup-plugin-livereload";
import postcss from "rollup-plugin-postcss";
import serve from "rollup-plugin-serve";

import('dotenv').then(m => m.config());

export default {
  input: "./src/index.tsx",
  output: {
    file: "./public/dist/bundle.js",
    format: "iife",
    sourcemap: true,
  },
  plugins: [
    typescript({
      jsx: "react-jsx",
    }),
    nodeResolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'development' )
    }),
    postcss({
      plugins: [
        require('tailwindcss'),
        require('autoprefixer')
      ]
    }),
    babel({
      presets: ["@babel/preset-react"],
    }),
    commonjs(),
    serve({
      open: true,
      verbose: true,
      contentBase: ["public"],
      host: "localhost",
      port: process.env.PORT ?? 3000,
    }),
    livereload({ watch: "./public/dist" }),
  ]
};
