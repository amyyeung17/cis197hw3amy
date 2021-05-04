/* eslint no-unused-vars: 0 */
/* eslint-env browser */
/* globals $, MapBuilder, Player */

$(document).ready(() => {
  const $mapElement = $('#map-builder')
  const builder = new MapBuilder($mapElement)
  builder.setupPalette()
  builder.setupMapCanvas()
  console.log(builder)
  new Player(0, 0, builder) //eslint-disable-line
})
