/*eslint-env browser */
/*globals $ */

// Default size of map (in tiles)
const DEFAULT_WIDTH = 30
const DEFAULT_HEIGHT = 15
const counter = 0

/**
 * @param {object} $container jQuery node to inject map into
 * @param {{ width?: number, height?: number }} params
 */
class MapBuilder {

  height = DEFAULT_HEIGHT
  width = DEFAULT_WIDTH

  constructor(container, height, width) {
    this.$elem = $(container)
    const $x = $('#map-builder').find('.palette')

    if (typeof (height) !== 'undefined') {
      this.height = height
    }

    if (typeof (width) !== 'undefined') {
      this.width = width
    }
  }

  setupPalette = () => {
    this.$elem.click(i => {
      const newcolor = i.target.classList['value']
      const oldcolor = (($('.selected').get(0).classList)['value'])
      const $x = $('#map-builder').find('.palette')

      $x.find('.selected').removeClass('selected')

      const {target} = i
      $(target).addClass('selected') })
  }

  setupMapCanvas = () => {
    const $map = $('#map-builder').find('.map')
    const canvash = Array.from(Array(this.height).keys())
    const canvasw = Array.from(Array(this.width).keys())
    let returnx = ''
    let moused = 0

    canvash.forEach(a => {
      const $newDiv = $('<div>')
      $newDiv.addClass(`row${a}`)
      $map.append($newDiv)
      canvasw.forEach(b => {
        const $newDiv1 = $('<div>')
        $newDiv1.addClass('tile')
        $newDiv1.addClass(($('.selected').get(0).classList)['value'])
        $newDiv1.removeClass('selected')
        $newDiv1.data('id', b)
        $map.find(`.row${a}`).append($newDiv1)

        $newDiv1.mouseenter(({ target }) => {
          let attach = 0
          const $c = $('#map-builder').find('.palette')
          const old = (($c.find('.selected')).get(0).classList)['value'].split(' selected')
          const arrayv = ($(target).get(0)).classList
          let hoverv = ''

          arrayv.forEach(m => {
            if (!(m.includes('selected') || m.includes('tile') || m.includes('swatch'))) {
              if (!m.includes(old[0])) {
                $newDiv1.data('value', m)
                attach = 1
                hoverv = m
              }
            }
          })

          if(!attach) {
            hoverv = $newDiv1.data('value', ($(target).get(0)).classList[2])
          }

          $newDiv1.removeClass(`swatch ${hoverv}`).addClass(old[0])
        })

        $newDiv1.mousedown(({ target1 }) => {
          const $c = $('#map-builder').find('.palette')
          const old = (($c.find('.selected')).get(0).classList)['value'].split(' selected')
          const oldval = $newDiv1.data('value')
          const $d = ($c.find('.selected'))

          $newDiv1.removeClass('tile swatch ' + oldval).addClass(`tile ${old[0]}`)
          $newDiv1.data('value', old[0])
          returnx = $d.get(0).classList
          moused = 1
        })

        $newDiv1.mouseout(() => {
          const $c = $('#map-builder').find('.palette')

          if (moused === 1) {
            $c.find(`.${returnx[1]}`).addClass('swatch ' + returnx[1] + ' selected')
          }

          if (moused === 0) {
            let old = (($c.find('.selected')).get(0).classList)["value"].split(" selected")

            returnx = $newDiv1.data('value')
            $newDiv1.removeClass('swatch ' + old[0]).addClass('swatch ' + returnx)
          }
          moused = 0
        })

      })
    })


  }
}
