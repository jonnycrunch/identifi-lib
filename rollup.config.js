import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

const name = `identifiLib`;

const plugins = [
  json(),
  babel({
    exclude: 'node_modules/**',
    plugins: ['external-helpers', 'transform-runtime'],
    runtimeHelpers: true
  }),
  builtins(),
  nodeResolve({
    module: true,
    jsnext: true,
    browser: true,
  }),
  commonjs({
    include: `node_modules/**`
  }),
  filesize(),
  globals()
];

const isProd = process.env.NODE_ENV === `production`;
if (isProd) plugins.push(terser());

export default {
  input: `src/index.js`,
  plugins,
  output: {
    file: `dist/${name}${isProd ? `.min` : ``}.js`,
    name: name,
    format: `umd`,
  }
};
