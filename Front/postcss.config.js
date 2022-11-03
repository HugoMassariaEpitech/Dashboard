module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    // TODO: Trouver le moyen de ne pas utiliser cssnano en dev avec process.env.NODE_ENV
    // require('cssnano')({
    //   preset: 'default',
    // }),
  ]
}