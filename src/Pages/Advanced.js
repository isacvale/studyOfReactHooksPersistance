import React from 'react'
import useArtistStore from '../Stores/useArtistStore'

const randomElement = arr => arr[Math.floor(Math.random() * arr.length)]

const DisplayComponent = props => {
  const [modern, setModern] = useArtistStore('modern')

  return (
    <div className='display-container'>
      <h2>Display</h2>
      <p>architect <span>{modern.architect}</span></p>
      <p>musician <span>{modern.musician}</span></p>
      <p>painter <span>{modern.painter}</span></p>
    </div>
  )
}

const DisplayComponentTwo = props => {
  const [modernArchitect, setModernArchitect] = useArtistStore('modern.architect')
  const [modernMusician, setModernMusician] = useArtistStore('modern.musician')
  const [modernPainter, setModernPainter] = useArtistStore('modern.painter')

  return (
    <div className='display-container'>
      <h2>Display</h2>
      <p>architect <span>{modernArchitect}</span></p>
      <p>musician <span>{modernMusician}</span></p>
      <p>painter <span>{modernPainter}</span></p>
    </div>
  )
}

const InputComponent = () => {
  const [modernArchitect, setModernArchitect] = useArtistStore('modern.architect')
  const [modernMusician, setModernMusician] = useArtistStore('modern.musician')
  const [modernPainter, setModernPainter] = useArtistStore('modern.painter')

  const [modern, setModern] = useArtistStore('modern')

  const getRandomArchitect = () => randomElement(['Frank Lloyd Wright', 'Oscar Niemeyer', 'Le Corbusier', 'Zaha Hadid'].filter(name => name !== modernArchitect))
  const getRandomMusician = () => randomElement(['Bob Dylan', 'Enya', 'Loreenna MacKennit', 'Elvis Presley'].filter(name => name !== modernMusician))
  const getRandomPainter = () => randomElement(['Gerhard Richter', 'Pablo Picasso', 'Vincent Van Gogh', 'Salvador Dalí'].filter(name => name !== modernPainter))
  const architect = getRandomArchitect()
  const musician = getRandomMusician()
  const painter = getRandomPainter()

  const blankOnes = {
    architect: '!' + getRandomArchitect(),
    painter: '!' + getRandomPainter(),
    sculptor: '!' + 'Maria',
    musician: '!' + getRandomMusician()
  }

  return (
    <div className='button-container'>
      <button
        onClick={() => setModernArchitect(architect)}
      >
        {architect}
      </button>

      <button
        onClick={() => setModernMusician(musician)}
      >
        {musician}
      </button>

      <button
        onClick={() => setModernPainter(painter)}
      >
        {painter}
      </button>

      <button
        onClick={() => setModern(blankOnes)}
      >
        everything!
      </button>
    </div>
  )
}

const ShowDeep = () => {
  const [deepStore, setDeepStore] = useArtistStore('deep1')
  const changeDeepStore = () => setDeepStore({
      deep2: {
        deep3: {
          deep4: Math.random()
        }
      }
    })
  return (
    <div>
      <p>{deepStore.deep2.deep3.deep4}</p>
      <button onClick={() => setDeepStore(Math.random())}>Change</button>
    </div>
  )
}

const Advanced = () => {
  return (
    <div>
      <article>
        <h1>Store Avançada</h1>
        <p>
          Nessa abordagem a store não precisa ser dividida em section, e os componentes podem ser registrar a propriedades específicas da store. Isso deixa o processo mais eficiente, já que os componentes só precisam re-renderizar se propriedades relevantes forem atualizadas.
        </p>
        <InputComponent />
        <section className='display-section'>
          <DisplayComponent/>
          <DisplayComponentTwo/>
        </section>
        <h2>Como utilizar</h2>
        <h3>Criando a store</h3>
        1. Execute createStore paasando o estado inicial.
        <code><pre>
          {
`const state = {
  name: 'John Doe',
  ...
}
return default createStore(state)`
          }
        </pre></code>
        <h3>Utilizando a store</h3>
        1. Importe o Custom Hook criado e use-o como o useState, exceto por uma diferença: <em>Ao invés de passar o state inicial como argumento, passe a uma string indicando qual propriedade o componente utilizará. Por exemplo, para ouvir a propriedade nome:</em>
        <code><pre>
{
`const MyComponent = () => {
  const [name, setName] = useMyStore('name')
  return <div>{name}</div>
}`}
        </pre></code>
        2. Ao declarar a propriedade a ouvir, pode-se usar "." para se subscrever a propriedades nested na store. Por exemplo, para ouvir a propriedade cidade, filho de estado, filho de pais:
        <code><pre>
          {
`const MyComponent = () => {
  const [cidade, setCidade] = useMyStore('pais.estado.cidade')
  return <div>{cidade}</div>
}`}
        </pre></code>
      </article>
    </div>
  )
}

export default Advanced