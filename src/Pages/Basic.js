import React from 'react'
import useArtistStore from '../Stores/useBasicArtistStore'

const randomElement = arr => arr[Math.floor(Math.random() * arr.length)]

const DisplayComponent = props => {
  const {sectionName} = props
  const [section, setSection] = useArtistStore(sectionName)
  return (
    <div className='display-container'>
      <h2>Display: {sectionName}</h2>
      <p>architect <span>{section.architect}</span></p>
      <p>musician <span>{section.musician}</span></p>
      <p>painter <span>{section.painter}</span></p>
    </div>
  )
}

const InputComponent = () => {
  const [modern, setModern] = useArtistStore('modern')

  const architect = randomElement(['Frank Lloyd Wright', 'Oscar Niemeyer', 'Le Corbusier', 'Zaha Hadid'].filter(name => name !== modern.architect))
  const musician = randomElement(['Bob Dylan', 'Enya', 'Loreenna MacKennit', 'Elvis Presley'].filter(name => name !== modern.musician))
  const painter = randomElement(['Gerhard Richter', 'Pablo Picasso', 'Vincent Van Gogh', 'Salvador Dalí'].filter(name => name !== modern.painter))

  return (
    <div className='button-container'>
      <button
        onClick={() => setModern({ architect })}
      >
        {architect}
      </button>

      <button
        onClick={() => setModern({ musician })}
      >
        {musician}
      </button>

      <button
        onClick={() => setModern({ painter })}
      >
        {painter}
      </button>
    </div>
  )
}

const Basic = () => {
  return (
    <div>
      <article>
        <h1>Store Básica</h1>
        <p>
          Nesta abordagem, cada store é dividida em sections (o domínio seria uma section, os dados do projeto seriam outra, o histórico outra, etc).
        </p>
        <p>
          O componente se registra não somente numa store, mas a uma <em>section</em> de uma store. O motivo disso é performance: todos os componentes que subscrevem a uma section são renderizados novamente sempre que a section sofrer alteração.
        </p>
        <p>
          Neste exemplo existe uma store ("useArtistStore") com duas sections ("modern" e "classic"). Ao clicar os botões abaixo, você aletarará a section modern, o que causará o rerender dos dois primeiros displays abaixo.
        </p>
        <p>
          Note ques os displays modern estão em branches diferentes do react Component (não são descendentes um do outro), e não estão elevando seu state a nenhum componente ancestral.
        </p>
        <p>
          Você pode utilizar as ferramentas de desenvolvedor e conferir que alteração na section "modern" não causam rerender no display "classic".
        </p>
      </article>
      <InputComponent />
      <section className='display-section'>
        <DisplayComponent sectionName='modern'/>
        <DisplayComponent sectionName='modern'/>
        <DisplayComponent sectionName='classic'/>
      </section>
      <h2>Como utilizar</h2>
      <h3>Criando a Store</h3>
      1. Execute createStore para gerar duas funções: a primeira é o Custom Hook a ser usado pelos componentes, a segunda é uma função de load para carregar as sections da store.
      <code><pre>
        {'const [useMyStore, load] = createStore()'}
      </pre></code>
      2. Use a função de load, passando uma string como nome e um objecto como state inicial.
      <code><pre>
        {
`load('mySection', {
  name: 'John Doe',
  ...
})`
        }
      </pre></code>
      3. E por fim exporte a função Custom Hook gerada no primeiro passo.
      <h3>Utilizando a Store</h3>
      1. Importe o Custom Hook criado e use-o como o useState, exceto por uma diferença: <em>Ao invés de passar o state inicial como argumento, passe a string que indica qual section quer subscrever.</em>
      <code><pre>
        {
`const MyComponent = () => {
  const [section, setSection] = useMyStore('mySection')
  return <div>{section.name}</div>
}`
        }
      </pre></code>
      2. Note que a variável section representa todo o objeto da mySection. Não é possível subscrever a uma propriedade individual.
      3. Para setar uma propriedade, é necessário passar um objeto contendo a propriedade a ser modificada.

      <code><pre>
        {
`const MyComponent = () => {
  const [section, setSection] = useMyStore('mySection')
  return (
    <div>
      <div>{section.name}</div>
      <button
        onCLick={() => setSection({ name: 'Pedro Pedreiro' })}
      >
        Alterar Nome
      </button>
    </div>
  )
}`
        }
      </pre></code>
    </div>
  )
}

export default Basic