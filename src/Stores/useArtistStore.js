import createStore from './createStore'

const state = {
  modern : {
    architect: 'Frank Lloyd Wright',
    painter: 'Gerhard Richter',
    sculptor: 'Paul McCarthy',
    musician: 'Bob Dylan'
  },
  classic: {
    architect: 'Michelangelo',
    painter: 'Michaelangelo',
    sculptor: 'Michaelangelo',
    musician: 'Frédéric François Chopin'
  }
}

export default createStore(state)