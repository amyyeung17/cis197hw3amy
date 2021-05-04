/* eslint-env browser */
/* globals $ */

// The size of a swatch (in pixels)
const SWATCH_SIZE = 25

// Utility function - checks if a given swatch name is walkable terrain.
const isTerrain = swatchType => (
  [
    'grass',
    'flowers-red',
    'flowers-orange',
    'flowers-blue',
    'weed',
    'weed-4x',
    'weed-small',
    'weed-2x',
    'field',
    'sand-patch',
    'sand',
    'sand-nw',
    'sand-n',
    'sand-ne',
    'sand-w',
    'sand-e',
    'sand-sw',
    'sand-s',
    'sand-se',
    'sand-nw-inverse',
    'sand-ne-inverse',
    'sand-sw-inverse',
    'sand-se-inverse',
  ].indexOf(swatchType) >= 0
)

/**
 * Constructor for the player (Pikachu sprite).
 *
 * @param {number}     x       The beginning x coordinate (usually zero)
 * @param {number}     y       The beginning y coordinate (usually zero)
 * @param {MapBuilder} builder The MapBuilder object, with information about the map.
 *                             In particular, this builder object should have the container
 *                             element as a property so the '.map' div can be found using a
 *                             jQuery 'find' call.
 */
class Player {
  constructor(x, y, builder) {
    this.builder = builder
    this.$map = builder.$elem.find('.map')
    this.x = x
    this.y = y

    /**
     * TODO: Initialize the player class. You'll need to
     * 1. Create an element for the player and add it to the DOM, with a class
     *    specifying orientation. The classes are 'facing-{up, down, left, right}.'
     * 2. Listen to *keydown* events *on the document* to move the player.
     *    Keycodes for [left, up, right, down] are [37, 38, 39, 40], respectively.
     * 3. Change the player position and orientation based on key presses.
     *
     * You are highly encouraged to implement helper methods. See the class
     * website for more details.
     */
    let currentdirection = 'player facing-down'
    const $newplayer = $('<div>')
    const boundaryh = builder.height
    const boundaryw = builder.width
    $newplayer.addClass(currentdirection)

    $('.player').css('left', 0)
    $('.player').css('top', 0)

    this.$map.find('.row0').append($newplayer)


    $(document).keydown(e => {
      let currentleft = $('.player').position()['left']
      let currenttop = $('.player').position()['top']
      $newplayer.removeClass(currentdirection)

      if (e.keyCode === 37) {
        currentdirection = 'player facing-left'
        $newplayer.addClass('player facing-left')
        if(currentleft !== 0) {
          $('.player').css('left', currentleft - SWATCH_SIZE + 'px')
        }
      }
       if (e.keyCode === 38) {
         currentdirection = 'player facing-up'
         $newplayer.addClass('player facing-up')
         if(currenttop !== -23 && currenttop !== 2){
           $('.player').css('top', currenttop - SWATCH_SIZE + 'px')
         }
       }
       if (e.keyCode === 39) {
         currentdirection = 'player facing-right'
         $newplayer.addClass('player facing-right')
         if(currentleft !== ((boundaryw - 1) * SWATCH_SIZE)) {
           $('.player').css('left', currentleft + SWATCH_SIZE + 'px')
         }
       }
       if (e.keyCode === 40) {
        currentdirection = 'player facing-down'
        $newplayer.addClass('player facing-down')
        if(currenttop !== ((boundaryh) * SWATCH_SIZE + 2)) {
          $('.player').css('top', currenttop + SWATCH_SIZE + 'px')
      }
      }
     })
  }

}
