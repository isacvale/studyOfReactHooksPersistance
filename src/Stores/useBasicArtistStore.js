import createStore from './createStoreBasic'

const [useArtistStore, load] = createStore()

load('modern', {
  architect: 'Frank Lloyd Wright',
  painter: 'Gerhard Richter',
  sculptor: 'Paul McCarthy',
  musician: 'Bob Dylan'
})
load('classic', {
  architect: 'Michelangelo',
  painter: 'Michaelangelo',
  sculptor: 'Michaelangelo',
  musician: 'Frédéric François Chopin'
})

export default useArtistStore