
export function setIndex(index) {
  return {
    type: 'LFMSELECTED',
    index: index
  }
}
export function boreholeSeleced(borehole) {
  return {
    type: 'HOME_BOREHOLE_SELECTED',
    borehole: borehole
  }
}
