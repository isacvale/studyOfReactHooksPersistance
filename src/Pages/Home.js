import React, { useState } from 'react'
import Advanced from './Advanced'
import Basic from './Basic'


const Home = () => {
  const [modo, setModo] = useState('')

  return (
    <div>
      <h1>Estudo de persistência com React Hooks</h1>
      <p>Essas duas variações se baseiam no artigo <a href='https://medium.com/javascript-in-plain-english/state-management-with-react-hooks-no-redux-or-context-api-8b3035ceecf8#:~:text=Sharing%20states&text=To%20work%20a%20solution%20which,functions%20fired%20and%20get%20updated.'>State Management with React Hooks — No Redux or Context API</a> por André Giardi. Especificamente, a ideia de um custom hook capturar a função de set do useState e colocá-la num array persistido por closure.</p>
      <p>A versão básica divide a store em sections: toda vez que uma section sofrer alteração, todos os componentes subscritos àquela section são atualizados.</p>
      <p>A versão avançada permite que um componente subscreva a propriedades específicas da store, mas atualmente possui um problema: componentes só respondem a alterações feitas por componentes subscritos no mesmo nível - ou seja, um componente registrado em 'a.b' e outro registrado em 'a' não desencadeiam alteração um no outro, o que é inaceitável. Acredito ser decorrente da Lei dos Hooks, mas não achei a causa do problema.</p>
      <p>Escolha uma seção para testar.</p>
      <div className='button-container'>
        <button onClick={() => setModo('basic')}>básico</button>
        <button onClick={() => setModo('advanced')}>avançado</button>
      </div>
      { modo === 'basic' ? <Basic /> : null }
      { modo === 'advanced' ? <Advanced /> : null }
    </div>
  )
}

export default Home